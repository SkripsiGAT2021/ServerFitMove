const express = require("express");
const { signUser } = require("../Controllers/AuthController");
const { authAndHeaderMiddleware } = require("../Middleware");

router.post("/signup", authAndHeaderMiddleware, signUser);
const router = express.Router({ mergeParams: true });

module.exports = router;
