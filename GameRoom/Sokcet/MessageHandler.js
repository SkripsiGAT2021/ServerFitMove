const controller = require("./SocketMessageController");
const { get } = require("../MessageType");

const messageHandler = (wsc, message) => {
  const parsedMessage = JSON.parse(message);
  console.log(message);
  switch (parsedMessage.type) {
    case get.GAME_ROOM:
      controller.createRoomWithSocket(wsc);
      break;
    // create room then response using send.R_GAME_ROOM
    case get.PHONE_CLIENT:
      console.log("gotcha phoneClient", parsedMessage);
      controller.connectToRoomWith(wsc, parsedMessage.data);
      break;
    // connect phone room with given id and send back R_PHONE_CLIENT, and send R_PHONE_CONNECTED
    case get.PHONE_READY:
      console.log("gotcha phoneReady", parsedMessage);
      controller.readyState(wsc, parsedMessage.data);
      break;
    // send to game display THEY ARE READY
    case get.POSE_DETECTION:
      console.log("gotcha poseDetection", parsedMessage);
      controller.poseDetected(wsc, parsedMessage.data);
      // keep track of the score
      // send to displat R_POSE_DETECTION
      break;
    case get.GAME_DONE:
      console.log("gotcha GameDone", parsedMessage);
      controller.gameDone(wsc, parsedMessage.data);
      // save score and mode to log
      // send back R_GAME_DONE
      // send to phone R_GAME_DONE Too
      break;
    case get.GAME_STARTED:
      console.log("GAME STARTED", parsedMessage);
      controller.gameStart(wsc, parsedMessage.data);
  }
};

module.exports = messageHandler;
