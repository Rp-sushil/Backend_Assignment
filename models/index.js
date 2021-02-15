const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "This video  does not have description",
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const videoModel = mongoose.model("video", VideoSchema);
module.exports = videoModel;
