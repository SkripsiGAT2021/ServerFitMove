const { closeRoom, getRoomWithKey } = require("../GameLogic/RoomGenerator");
const builder = require("../../Utils/SocketMessageBuilder");

const closehandler = (wsc, message) => {
  const room = getRoomWithKey(wsc.roomId || 0);
  let key = wsc.roomId;
  if (!room) {
    return null;
  }

  if (room.game) {
    room.game.roomId = null;
    room.game.send(
      builder("CONNECTION_CLOSED", {
        status: "CLOSED",
      })
    );
  }
  if (room.phone) {
    room.phone.roomId = null;
    room.phone.send(
      builder("CONNECTION_CLOSED", {
        status: "CLOSED",
      })
    );
  }
  closeRoom(key);
};

module.exports = closehandler;
