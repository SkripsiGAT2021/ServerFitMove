const {
  closeRoom,
  createRoom,
  getRoomWithKey,
} = require("../GameLogic/RoomGenerator");
const {
  poseGenerator,
  generateThemeFromBG,
  poseDetectionProcessor,
  starCounter,
  expCounter,
} = require("../GameLogic/GameLogic");
const builder = require("../../Utils/SocketMessageBuilder");

const { response } = require("../MessageType");
const GameLog = require("../../Firebase/FirebaseGameLog");

const createRoomWithSocket = (wsGame) => {
  console.log("called Create");
  const key = createRoom(wsGame);
  wsGame.roomId = key;
  wsGame.send(
    builder(response.R_GAME_ROOM, {
      roomId: key,
    })
  );
};

const connectToRoomWith = (wsc, message) => {
  const room = checkRoom(wsc, message.roomId);
  if (!room) {
    return;
  }
  // if user exist the can't Connect
  if (room.phone) {
    wsc.send(
      builder(response.R_ROOM_OCCUPIED, {
        status: "Error",
      })
    );
    return;
  }
  wsc.roomId = message.roomId;
  room.phone = wsc;
  room.userId = message.userId;
  room.mode = message.mode;
  const poses = poseGenerator(message.mode);
  room.poses = poses;
  wsc.send(
    builder(response.R_PHONE_CLIENT, {
      status: "OK",
      poses: poses,
      mode: room.mode,
    })
  );
  let { background, song, themeColor } = generateThemeFromBG(
    message.background
  );
  room.game.send(
    builder(response.R_PHONE_CONNECTED, {
      mode: room.mode,
      status: "OK",
      poses: poses,
      background,
      song,
      themeColor,
    })
  );
};

const poseDetected = (wsc, message) => {
  const { roomId, detection, next, poseId, changeToQ } = message;
  console.log(changeToQ || null);
  const room = checkRoom(wsc, roomId);
  if (!room) {
    return;
  }
  poseDetectionProcessor(room, detection, changeToQ, next);
  room.game.send(
    builder(response.R_POSE_DETECTION, {
      detection: detection,
      score: room.score,
      next: next || null,
      poseId: poseId || null,
      changeToQ: changeToQ || null,
    })
  );
};

const readyState = (wsc, message) => {
  const { roomId } = message;
  const room = checkRoom(wsc, roomId);
  if (!room) {
    return;
  }
  room.game.send(
    builder(response.R_READY, {
      status: "OK",
    })
  );
};

const gameDone = (wsc, message) => {
  const { roomId } = message;
  const room = checkRoom(wsc, roomId);
  if (!room) {
    return;
  }
  // save game log
  GameLog.create({
    userId: room.userId,
    mode: room.mode,
    score: room.score,
    date: new Date(),
  });
  // Remember to refacotr
  room.phone.send(
    builder(response.R_GAME_DONE, {
      status: "OK",
      score: room.score,
      star: starCounter(room.score),
      exp: expCounter(starCounter(room.score)),
    })
  );
  room.game.send(
    builder(response.R_GAME_DONE, {
      status: "OK",
      score: room.score,
      star: starCounter(room.score),
      exp: expCounter(starCounter(room.score)),
    })
  );
  closeRoom(roomId);
};

const checkConnection = (wsc, message) => {
  wsc.send(builder("R_CONNECTION_SAFE", { status: "OK" }));
};

const checkRoom = (wsc, roomId) => {
  const room = getRoomWithKey(roomId);
  if (!room) {
    wsc.send(
      builder(response.R_ERROR, {
        message: "ROOM_NOT_EXIST",
      })
    );
    return;
  } else return room;
};

const gameStart = (wsc, message) => {
  const { roomId } = message;
  const room = checkRoom(wsc, roomId);
  if (!room) {
    return;
  }
  room.phone.send(
    builder(response.R_GAME_STARTED, {
      status: "OK",
    })
  );
};

module.exports = {
  connectToRoomWith,
  poseDetected,
  readyState,
  gameDone,
  createRoomWithSocket,
  gameStart,
  checkConnection,
};
