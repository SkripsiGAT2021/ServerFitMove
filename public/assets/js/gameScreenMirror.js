/**
 * @param {HTMLElement} app
 * @param {String} mode
 * @param {Array<String>} poses
 */
const initGameScreenMirror = (app, gameState, cb) => {
  // change class of app screen
  app.classList.add("transition");
  setTimeout(() => {
    app.classList.remove("ready-screen");
    app.classList.add("game-screen");
    app.innerHTML = getGameScreenMirrorHTML(gameState);
    const posebar = getDom(".pose-bar");
    posebar.style.transform = `translateX(${(window.innerWidth / 9) * 4}px)`;
    getDom(".game-screen-modal").style.display = "flex";
    app.classList.remove("transition");
    setTimeout(() => {
      initialCountdown(cb);
    }, 500);
  }, 500);

  // // DEVELOPMENT PURPOSE
  // app.addEventListener("click", () => {
  //   nextMove(false);
  // });
  // // DEVELOPMENT PURPOSE
};

/**
 * Initial Countdown before playing
 */
// const initialCountdown = (cb) => {
//   getDom("#countdown").innerHTML = 3;
//   setTimeout(() => {
//     getDom("#countdown").innerHTML = 2;
//     setTimeout(() => {
//       getDom("#countdown").innerHTML = 1;
//       setTimeout(() => {
//         getDom("#audioSource").src = GameState.song;
//         getDom("#player").load();
//         getDom("#player").play();
//         cb();
//         getDom(".game-screen-modal").style.display = "none";
//         getDom(".timer-bar").classList.add("animation");
//       }, 1000);
//     }, 1000);
//   }, 1000);
// };

var currentGameIndex = 0;
const isLastMove = () => {
  return currentGameIndex + 1 >= GameState.poses.length;
};

/**
 * function to move poses
 * @param {Boolean} detection
 */
const nextMove = (detection) => {
  poseResult(currentGameIndex, detection);

  if (!isLastMove()) {
    setTimeout(() => {
      const posebar = getDom(".pose-bar");
      currentGameIndex += 1;
      const mainImage = getDom(".game-main>img");
      const currPose = getDom(`#pose${currentGameIndex} > img`);
      mainImage.src = currPose.src;

      let currDeviation = getTranslateXValueAndRemoveit(posebar);
      posebar.style.transform += `translateX(${
        currDeviation - (window.innerWidth / 9) * 2
      }px)`;
    }, 100);
  }
};

const movePoseBar = () => {
  setTimeout(() => {
    const posebar = getDom(".pose-bar");

    const mainImage = getDom(".game-main>img");
    const currPose = getDom(`#pose${currentGameIndex} > img`);
    mainImage.src = currPose.src;

    let currDeviation = getTranslateXValueAndRemoveit(posebar);
    posebar.style.transform += `translateX(${
      currDeviation - (window.innerWidth / 9) * 2
    }px)`;
  }, 100);
};

/**
 * use to reset timer bar when we change to next pose
 */
const resetBar = () => {
  const bar = getDom(".timer-bar");
  bar.classList.remove("animation");
  setTimeout(() => {
    bar.classList.add("animation");
  }, 20);
};

/**
 * use to stop timer bar when we change to next pose
 */
const stopBar = () => {
  const bar = getDom(".timer-bar");
  bar.classList.remove("animation");
};
/**
 * Change pose photo ccording to detection
 * @param {Number} currIndex
 * @param {Boolean} isCorrect
 */
const poseResult = (currIndex, isCorrect) => {
  const currPose = getDom(`#pose${currIndex}`);
  currPose.querySelector(isCorrect ? ".O" : ".X").style.display = "block";
};

const generateCellMirror = (pose, id, isLastCell) => `
    <div class="cell" id="pose${id}" style="width:${window.innerWidth / 9}px">
        <img src="./assets/img/${pose}" alt="" />
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
          }px; background:red;height:10px;margin: 0 ${
            window.innerWidth / 100
          }px;"></div>`
    }
`;

/**
 * generate game poses html
 * @param {Array} poses
 */
const generateAllPosesMirror = (poses) =>
  poses.reduce(
    (posesHTML, pose, idx, arr) =>
      (posesHTML += generateCellMirror(pose, idx, idx + 1 == arr.length)),
    ""
  );

/**
 * make game screen HTML string
 * @param {String} mode
 * @param {Array} poses
 * @returns {String} HTML String
 */
const getGameScreenMirrorHTML = ({ mode, poses, background, themeColor }) => `
    <div class="game-header" style="background:${themeColor}; color:white;">
        <div class="content-item">
          <h2>${mode}</h2>
        </div>
        <div class="content-item">
          <h2 id="score-label">Score: 0</h2>
        </div>
    </div>
    <div class="timer-bar mirror"></div>
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
        <img
          src="./assets/img/${poses[0]}"
          alt="${poses[0]}"
          class="main-pose-img"
        />
        <div style="width: 8em"></div>
    </div>

    <div class="pose-container" style="background:${themeColor}; ">
        <div class="pose-bar" style="width:${
          ((poses.length * window.innerWidth) / 9) * 2
        }px">
        ${generateAllPosesMirror(poses)}
        </div>
    </div>
`;
