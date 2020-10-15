const express = require("express");
const router = express.Router({ mergeParams: true });
const { signUser } = require("./AuthController");
const { authAndHeaderMiddleware } = require("../Middleware");

router.post("/signup", authAndHeaderMiddleware, signUser);

module.exports = router;
