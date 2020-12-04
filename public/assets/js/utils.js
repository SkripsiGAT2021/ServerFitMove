/**
 * @param {String} selector
 * @returns {HTMLElement}
 */
const getDom = (selector) => {
  return document.querySelector(selector);
};

/**
 * Game State
 */
const GameState = {
  roomId: null,
  mode: "NULL",
  poses: [],
  background: "",
  song: "",
  themeColor: "",
  score: 0,
};

/**
 * Get transform translateX current value
 * @param {HTMLElement} dom HTML DOM Object
 * @returns {Number} float of current translateX value
 */
const getTranslateXValueAndRemoveit = (dom) => {
  const pattern = /translateX\([^\)]*\)/i;
  let match = dom.style.transform.match(pattern);
  dom.style.transform = dom.style.transform.replace(pattern, "");
  if (match.length > 0) {
    return parseFloat(match[0].replace("translateX(", "").replace("px)", ""));
  }
  return 0;
};

/**
 * @param {String} selector
 * @returns {Array<HTMLElement>}
 */
const getAllDom = (selector) => {
  return document.querySelectorAll(selector);
};

/**
 * funtion to transition page
 * @param {HTMLElement} app
 * @param {String} newPage
 */
const changePageTransition = (app, newPage) => {
  app.classList.add("transition");
  setTimeout(() => {
    app.innerHTML = newPage;
    app.classList.remove("transition");
  }, 500);
};

/**
 * Make String to Poses image
 * @param {Array<String>} poses
 * @returns {Array<String>} posesImage
 */
const mapStringToPose = (poses, mode) => {
  // remember to change it to images
  if (mode == "mirror") {
    console.log(poses);
    return poses[0].map((pose) => `poses/${pose.name}`);
  }
  return poses.map((pose) =>
    pose.map((singlePose) => {
      return {
        name: `poses/${singlePose.name}`,
        id: singlePose.id,
      };
    })
  );
};
