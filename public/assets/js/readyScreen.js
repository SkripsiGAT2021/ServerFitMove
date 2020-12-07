/**
 * funtion to get HTMLString of ready screen
 * @returns {String} readyPose Screen HTML String
 */
const readyHTMLContent = () => `
    <div class="ready-content">
        <img src="./assets/img/readyPoseWhite.svg" alt="ready-pose.svg" />
        <h1>Make this pose if you're ready to play</h1>
    </div>
`;

/**
 * Initialzie Ready Screen
 * @param {HTMLElement} app
 */
const initReadyScreen = async (app) => {
  app.classList.add("transition");
  setTimeout(() => {
    app.classList.add("ready-screen");
    app.innerHTML = readyHTMLContent();
    app.classList.remove("transition");
  }, 500);
};
