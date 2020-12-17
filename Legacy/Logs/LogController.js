const GameLog = require("../Firebase/FirebaseGameLog");
var check = require("check-types");

const createLog = (req, res) => {
  let log = req.body;
  if (checkSanitize(log)) {
    GameLog.create({ ...log, ...{ score: parseInt(log.score) } })
      .then((log) => {
        return res.status(201).json({
          message: "Log Created",
        });
      })
      .catch((err) => {
        return res.status(409).json({
          error: err,
        });
      });
  } else {
    return res.status(409).json({
      error: "Object Not Sanitized",
    });
  }
};

const getLog = (req, res) => {
  let logId = req.params.logId;
  GameLog.get(logId)
    .then((log) => {
      res.status(200).json(log);
    })
    .catch((err) => {
      res.status(409).json({
        error: err,
      });
    });
};

const getAllLogs = (req, res) => {
  GameLog.getAll()
    .then((log) => {
      res.status(200).json(log);
    })
    .catch((err) => {
      res.status(409).json({
        error: err,
      });
    });
};

const getLogByUserId = (req, res) => {
  let userId = req.params.userId;
  GameLog.getByUserId(userId)
    .then((logs) => {
      res.status(200).json(logs);
    })
    .catch((err) => {
      res.status(409).json({
        error: err,
      });
    });
};

const updateLog = (req, res) => {
  let log = req.body;
  let logId = req.params.logId;
  if (checkSanitize(log)) {
    GameLog.update(logId, { ...log, ...{ score: parseInt(log.score) } })
      .then((log) => {
        res.status(201).json({
          message: "Log Updated",
        });
      })
      .catch((err) => {
        res.status(409).json({
          error: err,
        });
      });
  } else {
    res.status(409).json({
      error: "Object Not Sanitized",
    });
  }
};

const removeLog = (req, res) => {
  let logId = req.params.logId;
  GameLog.remove(logId)
    .then((log) => {
      res.status(201).json({
        message: "Log Removed",
      });
    })
    .catch((err) => {
      res.status(409).json({
        error: err,
      });
    });
};

const checkSanitize = (log) => {
  if (
    log.hasOwnProperty("mode") &&
    log.hasOwnProperty("score") &&
    log.hasOwnProperty("userId")
  ) {
    return (
      check.string(log.mode) &&
      check.integer(parseInt(log.score)) &&
      check.string(log.userId)
    );
  } else {
    return false;
  }
};

module.exports = {
  createLog,
  getLog,
  getAllLogs,
  getLogByUserId,
  updateLog,
  removeLog,
};
