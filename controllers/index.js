const videoModel = require("../models/index");

const videoData = async (req, res) => {
  const resultsPerPage = 5;
  const page = Math.max(0, req.query.page);
  //   const query = req.query.search;
  videoModel
    .find()
    .select({ title: 1, description: 1, publishedAt: 1, _id: 0 })
    .sort({ publishedAt: "desc" })
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
  const q = req.query.q;
  const resultsPerPage = 5;
  const page = Math.max(0, req.query.page);
  videoModel
    .find({ $text: { $search: `${q}` } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" }, publishedAt: "desc" })
    .select({ title: 1, description: 1, publishedAt: 1, score: 1, _id: 0 })
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
