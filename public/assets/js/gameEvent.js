/**
 * Websocket object
 */

/**
 * Connect to websocket listener
 */
socket.onopen = () => {
  // send message
  console.log(socket);
  socket.send(
    JSON.stringify({
      type: "GAME_ROOM",
    })
  );
};

/**
 * socket message event listener
 * @param {String} msg
 */
socket.onmessage = (msg) => {
  const message = JSON.parse(msg.data);

  switch (message.type) {
    case "R_GAME_ROOM":
      // displayRoom Number
      let { roomId } = message.data;
      roomKey.innerHTML = roomId;
      GameState.roomId = roomId;

      // show first page with room key
      break;
    case "R_PHONE_CONNECTED":
      console.log(message.data);
      let { poses, mode, background, song, themeColor } = message.data;
      GameState.mode = mode;
      GameState.poses = mapStringToPose(poses, mode);
      console.log(GameState.poses);
      GameState.background = background;
      GameState.song = song;
      GameState.themeColor = themeColor;
      getDom("#player").pause();
      initReadyScreen(app);
      break;
    case "R_POSE_DETECTION":
      let { detection, score, next, poseId, changeToQ } = message.data;
      GameState.score = score;
      if (GameState.mode == "mirror") {
        nextMove(detection);
        if (isLastMove()) {
          stopBar();
        } else {
          resetBar();
        }
      } else {
        if (changeToQ) {
          changeToQMode();
          resetBar();
        } else {
          if (next) {
            reRenderPoses();
            resetBar();
          } else {
            poseResultMemory(detection, poseId);
          }
        }
      }
      changeScorelabel(GameState.score);
      renderScoreBarMemory();
      break;
    case "R_READY":
      if (GameState.mode == "mirror") {
        initGameScreenMirror(app, GameState, () => {
          socket.send(buildMessage("GAME_STARTED"));
        });
      } else {
        initGameScreenMemory(app, GameState, () => {
          socket.send(buildMessage("GAME_STARTED"));
        });
      }

      break;
    case "R_GAME_DONE":
      showDone(message.data);
      break;
    case "CONNECTION_CLOSED":
      console.log("closed");
      showError("Connection Closed");
      break;
  }
};
