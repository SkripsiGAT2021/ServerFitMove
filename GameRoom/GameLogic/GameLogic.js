const {
  generateMemoryMode,
  generateMirrorMode,
} = require("../../Utils/PoseGenerator");

const poseGenerator = (mode) => {
  if (mode == "mirror") {
    return generateMirrorMode(150);
  }
  return generateMemoryMode(6, 7, 9);
};

const generateThemeFromBG = (bgName) => {
  switch (bgName) {
    case "gym":
      return {
        background: "images/bg/gym.png",
        song: "songs/betterDay.mp3",
        themeColor: "#465C60",
      };
    case "beach":
      return {
        background: "images/bg/beach.png",
        song: "songs/betterDay.mp3",
        themeColor: "#928647",
      };
    case "park":
      return {
        background: "images/bg/park.png",
        song: "songs/betterDay.mp3",
        themeColor: "#4C5200",
      };
    case "city":
      return {
        background: "images/bg/city.png",
        song: "songs/betterDay.mp3",
        themeColor: "#897763",
      };
    case "autumn":
      return {
        background: "images/bg/autumn.png",
        song: "songs/betterDay.mp3",
        themeColor: "#973600",
      };
    default:
      return {
        background: "images/bg/autumn.png",
        song: "songs/betterDay.mp3",
        themeColor: "#973600",
      };
  }
};

const poseDetectionProcessor = (
  room,
  detection,
  changeToQ = false,
  next = false
) => {
  if (!changeToQ && !next) {
    room.combo = detection ? room.combo + 1 : 0;
    if (room.combo >= 5) {
      room.score += room.mode == "mirror" ? 50 : 100;
      room.combo = 0;
    }
    room.score += detection ? (room.mode == "mirror" ? 100 : 200) : 0;
  } else if (next) {
    room.combo = detection ? room.combo : 0;
  }
};

const starCounter = (score) =>
  Math.floor(score / 3000) > 5 ? 5 : Math.floor(score / 3000);

const expCounter = (star) =>
  star < 1 ? 0 : star > 5 ? 5 : (star - 1) * 20 + 50;

module.exports = {
  poseGenerator,
  generateThemeFromBG,
  poseDetectionProcessor,
  starCounter,
  expCounter,
};
