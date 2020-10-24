// MODULE
const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");

// INTERNAL MODULE
const authRouter = require("./Auth/AuthRouter");
const logRouter = require("./Logs/LogRouter");
const Queue = require("./Utils/Queue");
const GameRoom = require("./GameRoom/GameRoom");

// VARIABLE
const app = express();
const port = process.env.PORT || 8000;
const ip = process.env.IP || "0.0.0.0";
// LOGIC
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use("/auth", authRouter);
app.use("/logs", logRouter);

app.get("/version", (req, res) => {
  res.status(201).json({
    version: "1.0.1",
  });
});

const server = app.listen(port, ip, () => {
  console.log(`server is starting in ${ip}:${port}`);
});

GameRoom(server, "/room");
