const { signOrCreateUser } = require("../Firebase/FirebaseAuth");
const { AUTH_KEY, X_DEVICE_FROM } = require("./Constants");

const authHeaderMiddleware = (req, res, next) => {
  if (req.header("authorization") != AUTH_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else if (req.header("X-Device-From") != X_DEVICE_FROM) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  return next();
};

const signUser = async (req, res) => {
  const user = req.body;
  try {
    const firebaseUser = await signOrCreateUser(user);
    res.status(200).json({
      id: firebaseUser.uid,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  signUser,
  authHeaderMiddleware,
};
