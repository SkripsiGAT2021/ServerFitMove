const { v4 } = require("uuid");
/**
 * Pose
 */
class Pose {
  /**
   * make Poses
   * @param { String } poseName
   * @param { Number } leftShoulderAngle
   * @param { Number } leftElbowAngle
   * @param { Number } leftHipAngle
   * @param { Number } leftKneeAngle
   * @param { Number } rightShoulderAngle
   * @param { Number } rightElbowAngle
   * @param { Number } rightHipAngle
   * @param { Number } rightKneeAngle
   */
  constructor({
    poseName = "",
    leftShoulderAngle = null,
    leftElbowAngle = null,
    leftHipAngle = null,
    leftKneeAngle = null,
    rightShoulderAngle = null,
    rightElbowAngle = null,
    rightHipAngle = null,
    rightKneeAngle = null,
  }) {
    this.id = v4();
    this.name = poseName;
    this.leftShoulderAngle = leftShoulderAngle;
    this.leftElbowAngle = leftElbowAngle;
    this.leftHipAngle = leftHipAngle;
    this.leftKneeAngle = leftKneeAngle;
    this.rightShoulderAngle = rightShoulderAngle;
    this.rightElbowAngle = rightElbowAngle;
    this.rightHipAngle = rightHipAngle;
    this.rightKneeAngle = rightKneeAngle;
  }
}

/**
 * function to generates Poses based on number to make how many number for MirrorMode
 * @param { Number } numberOfPoses number of poses
 * @returns { Array<Array<Pose>> }
 */
const generateMirrorMode = (numberOfPoses) => {
  var poses = [];
  for (var i = 0; i < numberOfPoses; i++) {
    let newPose = getPoses();
    while (i != 0 && poses[poses.length - 1].name == newPose.name) {
      newPose = getPoses();
    }
    poses.push(newPose);
  }
  return [poses];
};

/**
 * function to generates Poses based on number to make how many number for memory Mode
 * @param { Number } numberOfOnePoses number of poses
 * @param { Number } numberOfThreePoses number of poses
 * @param { Number } numberOfFivePoses number of poses
 * @returns { Array<Array<Pose>> }
 */
const generateMemoryMode = (firstWave, secondWave, thirdWave) => {
  var poses = [];
  for (var i = 0; i < firstWave; i++) {
    poses.push([getPoses()]);
  }
  for (var i = 0; i < secondWave; i++) {
    let posesTemp = [];
    while (posesTemp.length < 3) {
      let newPose = getPoses();
      if (!posesTemp.some((pose) => pose.name == newPose.name)) {
        posesTemp.push(newPose);
      }
    }
    poses.push(posesTemp);
  }

  for (var i = 0; i < thirdWave; i++) {
    let posesTemp = [];
    while (posesTemp.length < 5) {
      let newPose = getPoses();
      if (!posesTemp.some((pose) => pose.name == newPose.name)) {
        posesTemp.push(newPose);
      }
    }
    poses.push(posesTemp);
  }
  return poses;
};

/**
 * @returns { Pose }
 */
const getPoses = () => {
  const num = Math.floor(Math.random() * 8 + 1);
  switch (num) {
    case 1:
      return new Pose({
        poseName: "Pose 1.png",
        rightElbowAngle: 90,
        rightShoulderAngle: 90,
      });
    case 2:
      return new Pose({
        poseName: "Pose 3.png",
        rightElbowAngle: 180,
        rightShoulderAngle: 90,
        leftElbowAngle: 180,
        leftShoulderAngle: 90,
      });
    case 3:
      return new Pose({
        poseName: "Pose 4.png",
        rightElbowAngle: 90,
        rightShoulderAngle: 90,
        leftElbowAngle: 180,
        leftShoulderAngle: 160,
      });
    case 4:
      return new Pose({
        poseName: "Pose 5.png",
        rightElbowAngle: 90,
        rightShoulderAngle: 90,
        leftElbowAngle: 180,
        leftShoulderAngle: 90,
      });
    case 5:
      return new Pose({
        poseName: "Pose 6.png",
        rightElbowAngle: 180,
        rightShoulderAngle: 160,
        leftElbowAngle: 180,
        leftShoulderAngle: 160,
      });
    case 6:
      return new Pose({
        poseName: "Pose 8.png",
        leftElbowAngle: 180,
        leftShoulderAngle: 90,
      });
    case 7:
      return new Pose({
        poseName: "Pose 9.png",
        leftElbowAngle: 90,
        leftShoulderAngle: 90,
      });
    case 8:
      return new Pose({
        poseName: "Pose 10.png",
        leftElbowAngle: 90,
        leftShoulderAngle: 90,
        rightElbowAngle: 180,
        rightShoulderAngle: 160,
      });
    case 9:
      return new Pose({
        poseName: "Pose 11.png",
        leftElbowAngle: 90,
        leftShoulderAngle: 90,
        rightElbowAngle: 180,
        rightShoulderAngle: 90,
      });
    case 10:
      return new Pose({
        poseName: "Pose 12.png",
        rightElbowAngle: 180,
        rightShoulderAngle: 90,
      });
  }
};

module.exports = {
  generateMirrorMode,
  generateMemoryMode,
  Pose,
};
