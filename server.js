const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const search = require("./search/index");
const port = 5000;

dotenv.config();
//connect to DB
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("connected to MongoDB.....");
  }
);
// start listening..
app.listen(port, () => {
  console.log(`Server running......${port}`);
  setInterval(() => {
    search("official", "2018-01-01T00:00:00Z"); // parameter: query string and publishedAfter
  }, 30000);
});
