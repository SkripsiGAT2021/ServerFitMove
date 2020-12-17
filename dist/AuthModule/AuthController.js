"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthService_1 = require("./AuthService");
var AuthController = /** @class */ (function () {
    function AuthController() {
        this.router = express_1.Router({ mergeParams: true });
        this.basePath = "/auth";
        this.service = new AuthService_1.default();
        this.router.post("/signup", this.signUser.bind(this));
    }
    AuthController.prototype.signUser = function (req, res) {
        var user = req.body;
        console.log(user);
        this.service
            .signOrCreate(user)
            .then(function (user) {
            res.status(200).json(user);
        })
            .catch(function (err) {
            res.status(409).json({
                error: err,
            });
        });
    };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map