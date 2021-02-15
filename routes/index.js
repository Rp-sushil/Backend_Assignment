const express = require("express");
const router = express.Router();

const { videoData, search } = require("../controllers/index");

router.get("/videodata", videoData);
router.get("/search", search);

module.exports = router;
