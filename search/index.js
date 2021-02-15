const dotenv = require("dotenv");
const { google } = require("googleapis");
const videoModel = require("../models/index");
const mongoose = require("mongoose");
dotenv.config();

// connect to database

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// checking connection is made or not

mongoose.connection
  .once("open", async () => {
    console.log("connection has been made....");
  })
  .on("connectionError", (err) => {
    console.log(err);
  });

// reponsible for making API request for YOUTUBE data and saved it to the DATABASE

const search = (query, publishedAfter) => {
  google
    .youtube("v3")
    .search.list({
      key: process.env.YOUTUBE_TOKEN,
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
        // console.log(
        //   `\nTitle: ${item.snippet.title}\nDescription: ${item.snippet.description}\nPublisedAt: ${item.snippet.publishedAt}\nThumbnailUrl: ${item.snippet.thumbnails.default.url}`
        // );
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
            // checking all the data saved or not
            if (itemsProcessed === array.length) {
              console.log("connnection closed ...");
              mongoose.connection.close();
            }
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
};

search("the weekend", "2018-01-01T00:00:00Z");

// module.exports = search;
