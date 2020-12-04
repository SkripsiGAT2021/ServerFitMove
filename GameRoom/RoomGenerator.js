const Queue = require("../Utils/Queue");

const queue = new Queue();
let currIndex = 0;
const rooms = {};
const roomBuilder = (gameWebSocket) => {
  return {
    game: gameWebSocket,
    mode: null,
    score: 0,
    phone: null,
    combo: 0,
    userId: "",
  };
};

const createRoomKey = () => {
  if (queue.isEmpty()) {
    currIndex += 1;
    return `${currIndex}`;
  }
  return `${queue.nextQueue()}`;
};

const createRoom = (gameWebSocket) => {
  const roomKey = createRoomKey();
  rooms[roomKey] = roomBuilder(gameWebSocket);
  return roomKey;
};

const closeRoom = (roomKey) => {
  queue.addQueue(roomKey);
  rooms[roomKey] = null;
};

const getRoomWithKey = (roomKey) => {
  return rooms[roomKey];
};

module.exports = {
  createRoom,
  closeRoom,
  getRoomWithKey,
};
