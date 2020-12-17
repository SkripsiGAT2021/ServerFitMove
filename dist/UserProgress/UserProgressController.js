"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserProgressServices_1 = require("./UserProgressServices");
var UserProgressController = /** @class */ (function () {
    function UserProgressController() {
        this.router = express_1.Router({ mergeParams: true });
        this.basePath = "/userprogress";
        this.service = new UserProgressServices_1.default();
        this.router.get("/:userId", this.getUserProgress.bind(this));
        this.router.post("/", this.createOrUpdateUserProgress.bind(this));
    }
    UserProgressController.prototype.getUserProgress = function (req, res) {
        var userId = req.params.userId;
        console.log(userId);
        this.service
            .getWithId(userId)
            .then(function (userProgress) {
            res.status(200).json(userProgress);
        })
            .catch(function (err) {
            res.status(409).json({
                error: err,
            });
        });
    };
    UserProgressController.prototype.createOrUpdateUserProgress = function (req, res) {
        var userProg = req.body;
        console.log(userProg);
        this.service
            .createOrUpdate(userProg)
            .then(function () {
            res.status(201).json({
                message: "UserProg Created",
            });
        })
            .catch(function (err) {
            return res.status(409).json({
                error: err,
            });
        });
    };
    return UserProgressController;
}());
exports.default = UserProgressController;
//# sourceMappingURL=UserProgressController.js.map