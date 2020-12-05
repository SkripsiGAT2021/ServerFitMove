const MessageHandler = require("./MessageHandler");
const CloseHandler = require("./CloseHandler");

const onClose = (wsc, message) => {
  CloseHandler(wsc, message);
};

const onMessage = (wsc, message) => {
  MessageHandler(wsc, message);
};

module.exports = {
  onClose,
  onMessage,
};
