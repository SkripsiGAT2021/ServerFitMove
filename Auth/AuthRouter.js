const express = require("express");
const router = express.Router({ mergeParams: true });
const { authHeaderMiddleware, signUser } = require("./AuthController");

router.post("/signup", authHeaderMiddleware, signUser);

module.exports = router;
