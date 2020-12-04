const UserProgress = require("../Firebase/FirebaseUserProgress");
var check = require("check-types");

const createOrUpdateUserProgress = (req, res) => {
  let userProg = req.body;
  if (checkSanitize(userProg)) {
    UserProgress.createOrUpdate(userProg)
      .then((userProg) => {
        return res.status(201).json({
          message: "UserProg Created",
        });
      })
      .catch((err) => {
        return res.status(409).json({
          error: err,
        });
      });
  } else {
    return res.status(409).json({
      error: "Object Not Sanitized",
    });
  }
};

const getUserProgress = (req, res) => {
  let userId = req.params.userId;
  console.log(userId);
  UserProgress.get(userId)
    .then((userProg) => {
      res.status(200).json(userProg);
    })
    .catch((err) => {
      res.status(409).json({
        error: err,
      });
    });
};

const checkSanitize = (userProg) => {
  if (
    userProg.hasOwnProperty("userId") &&
    userProg.hasOwnProperty("unlockedBg") &&
    userProg.hasOwnProperty("date") &&
    userProg.hasOwnProperty("isUnlock") &&
    userProg.hasOwnProperty("dailyExp")
  ) {
    console.log("has all data");
    return (
      check.string(userProg.userId) &&
      check.integer(parseInt(userProg.unlockedBg)) &&
      check.integer(parseInt(userProg.unlockedBg))
      //   check.boolean(userProg.isUnlock)
    );
  } else {
    return false;
  }
};

module.exports = {
  getUserProgress,
  createOrUpdateUserProgress,
};
