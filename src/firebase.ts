import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";
const serviceAccount = require("../skripsigat2021-firebase-adminsdk-yz47s-51194e01ba.json");
export default class FirebaseManager {
  private static app: admin.app.App = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://skripsigat2021.firebaseio.com",
  });

  public static getCollectionReference(
    name: string
  ): FirebaseFirestore.CollectionReference {
    return this.app.firestore().collection(name);
  }
  public static getAuth(): admin.auth.Auth {
    return this.app.auth();
  }
}
