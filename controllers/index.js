const videoModel = require("../models/index");
sw = require("stopword");

const videoData = async (req, res) => {
  const resultsPerPage = 5;
  const page = Math.max(0, req.query.page);
  //   const query = req.query.search;
  videoModel
    .find()
    .select({
      title: 1,
      description: 1,
      publishedAt: 1,
      thumbnailUrl: 1,
      _id: 0,
    })
    .sort({ publishedAt: "asc" })
    .limit(resultsPerPage)
    .skip(resultsPerPage * page)
    .then((results) => {
      return res.status(200).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

const search = async (req, res) => {
  if (!req.query.q)
    return res.status(400).json({ message: "query string is not defined" });
  const oldString = req.query.q.split(" ");
  const newString = sw.removeStopwords(oldString);
  const q = newString.join(" ");
  const resultsPerPage = 5;
  const page = Math.max(0, req.query.page);
  videoModel
    .find({ $text: { $search: `${q}` } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .select({
      title: 1,
      description: 1,
      publishedAt: 1,
      thumbnailUrl: 1,
      score: 1,
      _id: 0,
    })
    .limit(resultsPerPage)
    .skip(resultsPerPage * page)
    .then((results) => {
      return res.status(200).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.videoData = videoData;
module.exports.search = search;
