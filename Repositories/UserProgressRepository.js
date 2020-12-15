const FirebaseAppManager = require("../Firebase/FirebaseAppManager");

class UserProgressRepository {
  #db = FirebaseAppManager.getFirebaseApp()
    .firestore()
    .collection("userProgress");

  createOrUpdate = async (userProgress) => {
    console.log("pusat");
    console.log(userProgress);
    return await this.#db.doc(userProgress.userId).set(userProgress);
  };

  get = async (id) => {
    let response = await this.#db.doc(id).get();
    console.log(await response.data());
    return { _id: response.id, ...(await response.data()) };
  };
}

module.exports = UserProgressRepository;
