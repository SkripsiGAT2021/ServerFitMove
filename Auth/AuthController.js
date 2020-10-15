const User = require("../Firebase/FirebaseUser");

const signUser = async (req, res) => {
  const user = req.body;
  try {
    const firebaseUser = await User.signOrCreate(user);
    res.status(200).json({
      id: firebaseUser.uid,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const getLogByUserId = (req, res) => {
  let userId = req.params.userId;
  GameLog.getByUserId(userId)
    .then((logs) => {
      res.status(200).json(log);
    })
    .catch((err) => {
      res.status(409).json({
        error: err,
      });
    });
};

module.exports = {
  signUser,
};
