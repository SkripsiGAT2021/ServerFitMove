const { closeRoom, createRoom, getRoomWithKey } = require("./RoomGenerator");
const {
  poseGenerator,
  generateThemeFromBG,
  poseDetectionProcessor,
} = require("./GameLogic");
const builder = require("../Utils/SocketMessageBuilder");

const { response } = require("./MessageType");
const GameLog = require("../Firebase/FirebaseGameLog");

const createRoomWithSocket = (wsGame) => {
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
  console.log("message");
  if (!room) {
    return;
  }
  // get userId
  wsc.roomId = message.roomId;
  room.phone = wsc;
  room.userId = message.userId;
  room.mode = message.mode;
  const poses = poseGenerator(message.mode);
  room.poses = poses;
  console.log("RPHONE_CLIENT_SEND");
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
  const data = poseDetectionProcessor(room, detection, changeToQ, next);
  room.game.send(
    builder(response.R_POSE_DETECTION, {
      ...data,
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
    userId: "edVo6aVNubOTukcogKgYRmnT7Ik2",
    mode: "MIRROR",
    score: room.score,
  });
  // Remember to refacotr
  room.phone.send(
    builder(response.R_GAME_DONE, {
      status: "OK",
      score: room.score,
      star: Math.floor((room.score / 2000) * 5),
      exp: 20,
      // Math.floor((room.score / 2000) * 5) > 0
      //   ? 40 + Math.floor((room.score / 2000) * 5) * 20
      //   : 0,
    })
  );
  room.game.send(
    builder(response.R_GAME_DONE, {
      status: "OK",
      score: room.score,
      star: Math.floor((room.score / 2000) * 5),
      exp:
        Math.floor((room.score / 2000) * 5) < 1
          ? 40 + Math.floor((room.score / 2000) * 5) * 20
          : 0,
    })
  );
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
};
