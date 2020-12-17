const admin = require("./FirebaseAdmin");
const db = admin.firestore().collection("userProgress");

const createOrUpdate = async (userProgress) => {
  console.log("pusat");
  console.log(userProgress);
  return await db.doc(userProgress.userId).set(userProgress);
};

const get = async (id) => {
  let response = await db.doc(id).get();
  console.log(await response.data());
  return { _id: response.id, ...(await response.data()) };
};

module.exports = { get, createOrUpdate };
