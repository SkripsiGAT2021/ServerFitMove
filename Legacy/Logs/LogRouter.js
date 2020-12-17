const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createLog,
  removeLog,
  updateLog,
  getLog,
  getLogByUserId,
  getAllLogs,
} = require("./LogController");
const { authAndHeaderMiddleware } = require("../Middleware");

router.post("/", authAndHeaderMiddleware, createLog);
router.get("/", authAndHeaderMiddleware, getAllLogs);
router.get("/:logId", authAndHeaderMiddleware, getLog);
router.patch("/:logId", authAndHeaderMiddleware, updateLog);
router.delete("/:logId", authAndHeaderMiddleware, removeLog);
router.get("/users/:userId", authAndHeaderMiddleware, getLogByUserId);

module.exports = router;
