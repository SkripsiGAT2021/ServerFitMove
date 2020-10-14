const admin = require("firebase-admin");
var serviceAccount = require("../skripsigat2021-firebase-adminsdk-yz47s-51194e01ba.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://skripsigat2021.firebaseio.com",
});

module.exports = firebaseApp;
