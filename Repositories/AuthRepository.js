const FirebaseAppManager = require("../Firebase/FirebaseAppManager");

class AuthRepository {
  signOrCreate = async (user) => {
    try {
      return await FirebaseAppManager.getFirebaseApp()
        .auth()
        .getUserByEmail(user.email);
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

  createUser = (user) => {
    return FirebaseAppManager.getFirebaseApp().auth().createUser(user);
  };
}

module.exports = AuthRepository;
