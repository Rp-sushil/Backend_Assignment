const dotenv = require("dotenv");
const { google } = require("googleapis");
const videoModel = require("../models/index");
dotenv.config();

// get the API Key from eviroment variables
const getAPIkey = (apiKeyIdx) => {
  const APIkeys = process.env.YOUTUBE_TOKENS.split(" ");
  return APIkeys[apiKeyIdx];
};

// reponsible for making API request for YOUTUBE data and saved it to the DATABASE

const search = (query, publishedAfter, apiKeyIdx) => {
  return google
    .youtube("v3")
    .search.list({
      key: getAPIkey(apiKeyIdx),
      part: "snippet",
      q: `${query}`,
      order: Date,
      type: "video",
      publishedAfter: `${publishedAfter}`,
    })
    .then(async (res) => {
      const { data } = res;
      var itemsProcessed = 0;
      await data.items.forEach((item, index, array) => {
        // creating an instance
        const videoData = videoModel({
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnailUrl: item.snippet.thumbnails.default.url,
        });
        videoData
          .save()
          .then((result) => {
            console.log(result._id);
            itemsProcessed++;
            // checking all the data saved or not [logging to ensure everthying is working fine]
            if (itemsProcessed === array.length) {
              console.log("chunk of data stored in to the database.....");
            }
          })
          .catch((err) => console.log(err));
      });
      return 0;
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 429) {
        /// tell to use next api key
        return 1;
      }
    });
};

module.exports = search;
