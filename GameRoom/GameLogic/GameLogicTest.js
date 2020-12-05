const {
  poseGenerator,
  poseDetectionProcessor,
  starCounter,
  expCounter,
} = require("./GameLogic");

const accColor = "\x1b[32m";
const errColor = "\x1b[31m";
const resetColor = "\x1b[0m";
const logAcc = (message) => {
  console.log(accColor, message.toUpperCase());
  console.log(resetColor);
};

const logErr = (err) => {
  console.log(errColor, err.toUpperCase());
  console.log(resetColor);
};

const createNewRoom = (mode) => {
  return {
    score: 0,
    mode: mode,
    combo: 0,
  };
};

const testPoseDetectionProcessorMirror = () => {
  let room = createNewRoom("mirror");
  try {
    poseDetectionProcessor(room, true);
    if (room.score != 100) {
      throw "suppose to have 100 score on correct detection";
    } else if (room.combo != 1) {
      throw "suppose combo is one";
    }
    for (var i = 0; i < 4; i++) {
      poseDetectionProcessor(room, true);
    }
    if (room.score != 500 + 50) {
      throw `score is ${room.score} supposely 550`;
    } else if (room.combo != 0) {
      throw `supposely combo is 0 but ${room.combo} found`;
    }
    logAcc(`Processor Mirror true Acc`);
  } catch (err) {
    logErr(`pose detection procesor mirror true: ${err}`);
  }
};
testPoseDetectionProcessorMirror();
const testPoseDetectionProcessorMirrorFalse = () => {
  let room = createNewRoom("mirror");
  try {
    poseDetectionProcessor(room, false);
    if (room.score != 0) {
      throw "suppose to have 0 score on correct detection";
    } else if (room.combo != 0) {
      throw "suppose combo is 0";
    }
    for (var i = 0; i < 4; i++) {
      poseDetectionProcessor(room, false);
    }
    if (room.score != 0) {
      throw `score is ${room.score} supposely 0`;
    } else if (room.combo != 0) {
      throw `supposely combo is 0 but ${room.combo} found`;
    }
    logAcc(`Processor Mirror False Acc`);
  } catch (err) {
    logErr(`pose detection procesor mirror false : ${err}`);
  }
};
testPoseDetectionProcessorMirrorFalse();

const testPoseDetectionProcessorMemory = () => {
  let room = createNewRoom("memory");
  try {
    poseDetectionProcessor(room, true, false, false);
    if (room.score != 200) {
      throw "suppose to have 200 score on correct detection";
    } else if (room.combo != 1) {
      throw "suppose combo is one";
    }
    for (var i = 0; i < 4; i++) {
      poseDetectionProcessor(room, true);
    }
    if (room.score != 1000 + 100) {
      throw `score is ${room.score} supposely 1100`;
    } else if (room.combo != 0) {
      throw `supposely combo is 0 but ${room.combo} found`;
    }
    logAcc(`Processor Memory Acc`);
  } catch (err) {
    logErr(`pose detection procesor memory : ${err}`);
  }
};
testPoseDetectionProcessorMemory();

const testPoseDetectionProcessorMemoryNext = () => {
  let room = createNewRoom("memory");
  try {
    poseDetectionProcessor(room, true, false, false);
    poseDetectionProcessor(room, false, false, true);
    if (room.score != 200) {
      throw `Supposely score was 200 get ${room.score} instead`;
    } else if (room.combo != 0) {
      throw `combo must be 0 get ${room.combo} instead`;
    }
    logAcc(`Processor Memory next Acc`);
  } catch (err) {
    logErr(`pose detection procesor memory : ${err}`);
  }
};
testPoseDetectionProcessorMemoryNext();

const testPoseDetectionProcessorMemoryChangeToQ = () => {
  let room = createNewRoom("memory");
  try {
    poseDetectionProcessor(room, true, false, false);
    poseDetectionProcessor(room, false, true, false);
    if (room.score != 200) {
      throw `Supposely score was 200 get ${room.score} instead`;
    } else if (room.combo != 1) {
      throw `combo must be 1 get ${room.combo} instead`;
    }
    logAcc(`Processor Memory change to q Acc`);
  } catch (err) {
    logErr(`pose detection procesor memory : ${err}`);
  }
};

testPoseDetectionProcessorMemoryChangeToQ();

const testStarCounter = () => {
  try {
    let star0 = starCounter(2999);
    if (star0 != 0) {
      throw `supposely get 0 star but get ${star0}`;
    }
    let star1 = starCounter(3000);
    if (star1 != 1) {
      throw `supposely get 1 star but get ${star1}`;
    }
    let star2 = starCounter(6000);
    if (star2 != 2) {
      throw `supposely get 2 star but get ${6000 / 3}`;
    }
    let star3 = starCounter(9000);
    if (star3 != 3) {
      throw `supposely get 3 star but get ${star3}`;
    }
    let star4 = starCounter(12000);
    if (star4 != 4) {
      throw `supposely get 4 star but get ${star4}`;
    }
    let star5 = starCounter(15000);
    if (star5 != 5) {
      throw `supposely get 5 star but get ${star5}`;
    }
    logAcc("StarCounter success");
  } catch (err) {
    logErr(`star failed : ${err}`);
  }
};

testStarCounter();

const testExpCounter = () => {
  try {
    let exp0 = expCounter(0);
    if (exp0 != 0) {
      throw `supposely get 0 exp but get ${exp0}`;
    }
    let exp50 = expCounter(1);
    if (exp50 != 50) {
      throw `supposely get 50 exp but get ${exp50}`;
    }
    let exp70 = expCounter(2);
    if (exp70 != 70) {
      throw `supposely get 70 exp but get ${exp70}`;
    }
    let exp90 = expCounter(3);
    if (exp90 != 90) {
      throw `supposely get 90 exp but get ${exp90}`;
    }
    let exp110 = expCounter(4);
    if (exp110 != 110) {
      throw `supposely get 110 exp but get ${exp110}`;
    }
    let exp130 = expCounter(5);
    if (exp130 != 130) {
      throw `supposely get 130 exp but get ${exp130}`;
    }
    logAcc("expCounter success");
  } catch (err) {
    logErr(`exp failed : ${err}`);
  }
};

testExpCounter();

const testPoseGenerator = () => {
  try {
    let mirrorPose = poseGenerator("mirror");
    if (mirrorPose.length > 1) {
      throw "mirror poses should have 1 set of pose";
    } else if (mirrorPose[0].length != 150) {
      throw "mirror poses should have 150 poses";
    }
    logAcc(`Mirror Pose ACC `);

    // MEMORY TEST
    let memoryPose = poseGenerator("memory");
    if (memoryPose.length != 22) {
      throw "memory poses should have 22 set of pose";
    }
    for (var i = 0; i < memoryPose.length; i++) {
      if (i < 6) {
        if (memoryPose[i].length != 1) {
          console.log(`${memoryPose[i].length}`);
          throw "supposely have 1 pose on this index";
        }
      } else if (i < 13) {
        if (memoryPose[i].length != 3) {
          throw "supposely have 3 pose on this index";
        }
      } else {
        if (memoryPose[i].length != 5) {
          throw "supposely have 5 pose on this index";
        }
      }
    }
    logAcc("memory mode acc");
  } catch (err) {
    logErr(`error testPoseGenerator : ${err} `);
  }
};

testPoseGenerator();
