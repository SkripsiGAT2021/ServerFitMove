const Websocket = require("ws");
const MessageHandler = require("./SocketEventHandler");

const initWebSocket = (server, path) => {
  const ws = new Websocket.Server({ server, path });
  websocketEventHandler(ws);
};

const websocketEventHandler = (serverWs) => {
  serverWs.on("connection", (wsc) => {
    wsc.on("error", (message) => {
      console.log(wsc, message);
      console.log("Above Undefiend");
    });
    wsc.on("close", (message) => {
      MessageHandler.onClose(wsc, message);
    });
    wsc.on("message", (message) => {
      MessageHandler.onMessage(wsc, message);
    });
  });
};

module.exports = initWebSocket;
