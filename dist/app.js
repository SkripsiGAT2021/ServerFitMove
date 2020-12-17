"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var UserProgressController_1 = require("./UserProgress/UserProgressController");
var AuthController_1 = require("./AuthModule/AuthController");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.ip = process.env.IP || "0.0.0.0";
        this.port = parseInt(process.env.PORT) || 8000;
        // binding everything in here
        this.configureAssets();
        this.configureRequest();
        this.configureTemplateEngine();
        this.mappingControllerToApp();
    }
    App.prototype.mappingControllerToApp = function () {
        var _this = this;
        var controllers = [new UserProgressController_1.default(), new AuthController_1.default()];
        controllers.forEach(function (controller) {
            console.log(controllers);
            _this.app.use(controller.basePath, controller.router);
        });
    };
    App.prototype.configureRequest = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    App.prototype.configureAssets = function () {
        this.app.use(express.static("public"));
    };
    App.prototype.configureTemplateEngine = function () {
        this.app.set("view engine", "ejs");
    };
    App.prototype.startServer = function () {
        var _this = this;
        this.server = this.app.listen(this.port, this.ip, function () {
            console.log("App listening on the http://localhost:" + _this.port);
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map