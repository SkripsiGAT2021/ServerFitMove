const {
  generateMemoryMode,
  generateMirrorMode,
} = require("../Utils/PoseGenerator");

const poseGenerator = (mode) => {
  if (mode == "mirror") {
    return generateMirrorMode(3);
  }
  return generateMemoryMode(1, 1, 1);
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
    room.combo = detection
      ? room.combo >= 100
        ? room.combo + 20
        : room.combo + 100
      : 0;
    room.score += room.combo;
  } else if (next) {
    room.combo = detection ? room.combo : 0;
  }
  return {
    detection: detection,
    score: room.score,
  };
};

module.exports = {
  poseGenerator,
  generateThemeFromBG,
  poseDetectionProcessor,
};
