const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createOrUpdateUserProgress,
  getUserProgress,
} = require("./UserProgController");
const { authAndHeaderMiddleware } = require("../Middleware");

router.post("/", authAndHeaderMiddleware, createOrUpdateUserProgress);
router.get("/:userId", authAndHeaderMiddleware, getUserProgress);

module.exports = router;
