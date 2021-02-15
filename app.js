const express = require("express");
const app = express();
const cors = require("cors");

// Import routes
const youtubeRoute = require("./routes/index.js");

//Router MIddlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/youtube", youtubeRoute);

app.all("*", function (req, res) {
  res.status(404).json({ message: "can find the route" });
});
module.exports = app;
