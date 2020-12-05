const admin = require("./FirebaseAdmin");

const signOrCreate = async (user) => {
  try {
    return await admin.auth().getUserByEmail(user.email);
  } catch (err) {
    if (err.code == "auth/user-not-found") {
      try {
        return await createUser(user);
      } catch (err) {
        throw err;
      }
    } else {
      throw err;
    }
  }
};

const createUser = (user) => {
  return admin.auth().createUser(user);
};

module.exports = {
  signOrCreate,
  createUser,
};
