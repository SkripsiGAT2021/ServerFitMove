const MessageHandler = require("./MessageHandler");

const onClose = (wsc, message) => {
  MessageHandler(wsc, message);
};

const onMessage = (wsc, message) => {
  console.log(message);
};

module.exports = {
  onClose,
  onMessage,
};
