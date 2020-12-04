const { closeRoom, getRoomWithKey } = require("../GameRoom/RoomGenerator");
const builder = require("../Utils/SocketMessageBuilder");

const closehandler = (wsc, message) => {
  const room = getRoomWithKey(wsc.roomId);
  if (!room) {
    return null;
  }
  if (room.game) {
    room.game.send(
      builder("CONNECTION_CLOSED", {
        status: "CLOSED",
      })
    );
  }
  if (room.phone) {
    room.phone.send(
      builder("CONNECTION_CLOSED", {
        status: "CLOSED",
      })
    );
  }

  closeRoom(wsc.roomId);
};

module.exports = closehandler;
