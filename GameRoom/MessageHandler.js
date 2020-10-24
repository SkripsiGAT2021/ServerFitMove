const RoomGenerator = require("./RoomGenerator");
const MessageBuilder = require("./SocketMessageBuilder");
const {
  CONNECT_CLIENT,
  CONNECT_GAME,
  CONNECT_ROOM,
  CREATE_ROOM,
} = require("./MessageType");

const connectGame = (wsc, message) => {
  roomKey = RoomGenerator.createRoom(wsc);
  wsc.send(
    JSON.stringify({
      TYPE: "ROOM_KEY",
      DATA: roomKey,
    })
  );
};

const messageHandler = (wsc, message) => {
  const parsedMessage = JSON.parse(message);
  switch (parsedMessage) {
    case CONNECT_CLIENT:
      break;
    // connecting to server as phone
    case CONNECT_ROOM:
      break;
    // connecting to server to connect to gameRoom
    case CONNECT_GAME:
      connectGame(wsc, parsedMessage);
      break;
    // connecting to server as gameWeb and create new room
  }
};

module.exports = messageHandler;
