class FirebaseAppManager {
  static #app = null;
  static getFirebaseApp() {
    if (this.#app == null) {
      const admin = require("firebase-admin");
      var serviceAccount = require("../skripsigat2021-firebase-adminsdk-yz47s-51194e01ba.json");
      this.#app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://skripsigat2021.firebaseio.com",
      });
      console.log("Called");
    }
    return this.#app;
  }
}

module.exports = FirebaseAppManager;
