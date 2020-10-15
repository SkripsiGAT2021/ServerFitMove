const { AUTH_KEY, X_DEVICE_FROM } = require("../Constants");

const authAndHeaderMiddleware = (req, res, next) => {
  if (req.header("authorization") != AUTH_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else if (req.header("X-Device-From") != X_DEVICE_FROM) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  return next();
};

module.exports = {
  authAndHeaderMiddleware,
};
