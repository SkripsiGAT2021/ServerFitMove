const FirebaseAppManager = require("../Firebase/FirebaseAppManager");

class GameLogRepository {
  #db = FirebaseAppManager.getFirebaseApp().firestore().collection("logs");
  create = async (user) => {
    return await this.#db.doc().set(user);
  };
  get = async (id) => {
    let response = await this.#db.doc(id).get();
    return { _id: response.id, ...(await response.data()) };
  };
  getAll = async () => {
    let logs = [];
    let queryStream = await this.#db.get();
    queryStream.forEach((log) => {
      logFormatted = {
        _id: log.id,
        ...log.data(),
      };
      logs.push(logFormatted);
    });
    return logs;
  };
  getByUserId = async (userId) => {
    let logs = [];
    let queryStream = await this.#db.where("userId", "==", userId).get();
    queryStream.forEach((log) => {
      logFormatted = {
        _id: log.id,
        ...log.data(),
      };
      logs.push(logFormatted);
    });
    return logs;
  };
  update = async (id, user) => {
    let currUser = await get(id);
    return await this.#db.doc(id).set({
      ...currUser,
      ...user,
    });
  };
  remove = async (id) => {
    return await this.#db.doc(id).delete();
  };
}

module.exports = GameLogRepository;
