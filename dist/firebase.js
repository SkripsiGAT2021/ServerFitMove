"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = require("../skripsigat2021-firebase-adminsdk-yz47s-51194e01ba.json");
var FirebaseManager = /** @class */ (function () {
    function FirebaseManager() {
    }
    FirebaseManager.getCollectionReference = function (name) {
        return this.app.firestore().collection(name);
    };
    FirebaseManager.getAuth = function () {
        return this.app.auth();
    };
    FirebaseManager.app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://skripsigat2021.firebaseio.com",
    });
    return FirebaseManager;
}());
exports.default = FirebaseManager;
//# sourceMappingURL=firebase.js.map