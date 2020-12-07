/**
 * @param {HTMLElement} app
 * @param {String} mode
 * @param {Array<String>} poses
 */
const initGameScreenMemory = (app, gameState, cb) => {
  // change class of app screen
  console.log(GameState.poses);
  app.classList.add("transition");
  setTimeout(() => {
    app.classList.remove("ready-screen");
    app.classList.add("game-screen");
    app.innerHTML = getGameScreenMemoryHTML(gameState);
    const posebar = getDom(".pose-bar");
    getDom(".game-screen-modal").style.display = "flex";
    app.classList.remove("transition");
    setTimeout(() => {
      initialCountdown(cb);
    }, 500);
  }, 500);

  // DEVELOPMENT PURPOSE
  app.addEventListener("click", () => {
    nextMove(false);
  });
  // DEVELOPMENT PURPOSE
};

const changeToQMode = () => {
  var poseContainer = getAllDom(".cell.pose");
  for (pose of poseContainer) {
    pose.classList.remove("pose");
    pose.classList.add("q-mode");
  }
  var title = getDom("#memoText");
  title.innerHTML = "Do The Poses";
};

const changeFromQMode = () => {
  var poseContainer = getAllDom(".cell.q-mode");
  for (pose of poseContainer) {
    pose.classList.add("pose");
    pose.classList.remove("q-mode");
  }
  var title = getDom("#memoText");
  title.innerHTML = "Memorize all the poses";
};

const reRenderPoses = () => {
  const poseContainer = getDom(".pose-bar");
  if (GameState.poses.length > 0) {
    poseContainer.innerHTML = generateAllPosesMemory(GameState.poses.shift());
  }
  var title = getDom("#memoText");
  title.innerHTML = "Memorize all the poses";
};

const poseResultMemory = (detection, id) => {
  const currPose = getDom(`#p${id}`);
  console.log(currPose, `#${id}`);
  if (currPose) {
    // LOGIC TO SHOW THE POSE
    currPose.classList.add("pose");
    currPose.classList.remove("q-mode");
    // LOGIC TO SHOW THE POSE
    currPose.querySelector(detection ? ".O" : ".X").style.display = "block";
  }
};

/**
 * Initial Countdown before playing
 */
const initialCountdown = (cb) => {
  getDom("#countdown").innerHTML = 3;
  setTimeout(() => {
    getDom("#countdown").innerHTML = 2;
    setTimeout(() => {
      getDom("#countdown").innerHTML = 1;
      setTimeout(() => {
        getDom("#audioSource").src = GameState.song;
        getDom("#player").load();
        getDom("#player").play();
        cb();
        getDom(".game-screen-modal").style.display = "none";
        getDom(".timer-bar").classList.add("animation");
      }, 1000);
    }, 1000);
  }, 1000);
};

const renderScoreBar = () => {
  document.querySelector(".star-prog-bar").style.transform = `scaleY(${
    GameState.score / (GameState.poses.length * 150) < 1
      ? GameState.score / (GameState.poses.length * 150)
      : 1
  })`;
};

const renderScoreBarMemory = () => {
  document.querySelector(".star-prog-bar").style.transform = `scaleY(${
    GameState.score / 2000 < 1 ? GameState.score / 15000 : 1
  })`;
};

const refreshBar = () => {
  document.querySelector(".star-prog-bar").style.transform = `scaleY(${
    GameState.score / (GameState.poses.length * 150) < 1
      ? GameState.score / (GameState.poses.length * 150)
      : 1
  })`;
};

/**
 * function to generate pose cell
 * @param {String} pose
 * @param {Number} id
 * @param {Boolean} isLastCell make arrow next to the cell if not false
 * @returns {String}
 */
const generateCellMemory = (pose, isLastCell) => `
    <div class="cell pose" id="p${pose.id}" style="width:${
  window.innerWidth / 9
}px">
        <img src="./assets/img/${pose.name}" alt="" class="pose-img"/>
        <img src="./assets/img/Q.svg" alt="" class="q-img"/>
        <div class="symbols" style="width:${window.innerWidth / 9}px">
            <img src="./assets/img/O.svg" class="O" alt="O.svg" />
            <img src="./assets/img/X.svg" class="X" alt="X.svg" />
        </div>
    </div>
    ${
      isLastCell
        ? ""
        : `<div class="cell" style="width:${
            window.innerWidth / 9 - (window.innerWidth * 2) / 100
          }px;height:10px;margin: 0 ${window.innerWidth / 100}px;"></div>`
    }
`;

/**
 * generate game poses html
 * @param {Array} poses
 */
const generateAllPosesMemory = (poses) =>
  poses.reduce(
    (posesHTML, pose, idx, arr) =>
      (posesHTML += generateCellMemory(pose, idx + 1 == arr.length)),
    ""
  );
/**
 * show done modals
 * @param {Object} param0
 */
const showDone = ({ score, star, exp }) => {
  const doneModal = getDom(".result-modal-backdrop");
  const scoreLabel = getDom("#done-score");
  const explabel = getDom("#done-exp");
  scoreLabel.innerHTML = `Score : ${score} Points &nbsp;&nbsp; Star: ${star}`;
  explabel.innerHTML = `Exp : +${exp} Points `;
  doneModal.style.display = "flex";
};

/**
 * make game screen HTML string
 * @param {String} mode
 * @param {Array} poses
 * @returns {String} HTML String
 */
const getGameScreenMemoryHTML = ({ mode, background, themeColor }) => `
    <div class="game-header" style="background:${themeColor}">
        <div class="content-item">
          <h2>${mode}</h2>
        </div>
        <div class="content-item">
          <h2 id="score-label">Score: 0</h2>
        </div>
    </div>
    <div class="timer-bar memory"></div>
    <div class="game-main" style="background-image: url('${background}')">
        <div class="star-container">
          <div class="star-bar">
            <img src="./assets/img/star.svg" class="star-icon" alt="" />
            <img src="./assets/img/star.svg" class="star-icon" alt="" />
            <img src="./assets/img/star.svg" class="star-icon" alt="" />
            <img src="./assets/img/star.svg" class="star-icon" alt="" />
            <img src="./assets/img/star.svg" class="star-icon" alt="" />
          </div>
          <div class="star-prog-bar"></div>
        </div>
        <h1 id="memoText">Memorize all the poses</h1>
        <div style="width: 8em"></div>
    </div>
    <div class="pose-container" style="background:${themeColor}">
        <div class="pose-bar" style="width:100%;display:flex; flex-direction:row; justify-content:center;">
        ${generateAllPosesMemory(GameState.poses.shift())}
        </div>
    </div>
`;

/**
 * function to change score label
 * @param {Number} newValue
 */
const changeScorelabel = (newValue) => {
  getDom("#score-label").innerHTML = newValue;
};
