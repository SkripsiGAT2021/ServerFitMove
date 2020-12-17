const admin = require("./FirebaseAdmin");
const db = admin.firestore().collection("logs");

const create = async (user) => {
  return await db.doc().set(user);
};

const get = async (id) => {
  let response = await db.doc(id).get();
  return { _id: response.id, ...(await response.data()) };
};

const getAll = async () => {
  let logs = [];
  let queryStream = await db.get();
  queryStream.forEach((log) => {
    logFormatted = {
      _id: log.id,
      ...log.data(),
    };
    logs.push(logFormatted);
  });
  return logs;
};

const getByUserId = async (userId) => {
  let logs = [];
  let queryStream = await db.where("userId", "==", userId).get();
  queryStream.forEach((log) => {
    logFormatted = {
      _id: log.id,
      ...log.data(),
    };
    logs.push(logFormatted);
  });
  return logs;
};

const update = async (id, user) => {
  let currUser = await get(id);
  return await db.doc(id).set({
    ...currUser,
    ...user,
  });
};

const remove = async (id) => {
  return await db.doc(id).delete();
};

module.exports = { create, get, getByUserId, getAll, update, remove };
