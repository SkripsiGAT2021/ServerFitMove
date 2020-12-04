// MODULE
const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");

// INTERNAL MODULE
const authRouter = require("./Auth/AuthRouter");
const logRouter = require("./Logs/LogRouter");
const userProgRouter = require("./UserProgress/UserProgRouter");
const Queue = require("./Utils/Queue");
const GameRoom = require("./GameRoom/GameRoom");
const { Pose } = require("./Utils/PoseGenerator");

// VARIABLE
const app = express();

const port = process.env.PORT || 8000;
const ip = process.env.IP || "0.0.0.0";
// LOGIC
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.disable("x-powered-by");
app.get("/home", (req, res) => {
  res.render("home");
});
app.use("/auth", authRouter);
app.use("/logs", logRouter);
app.use("/userprogress", userProgRouter);
app.get("/kacau", (req, res) => res.send(port));

const server = app.listen(port, ip, () => {
  console.log(`server is starting in ${ip}:${port}`);
});

GameRoom(server, "/room");
