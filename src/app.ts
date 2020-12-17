import * as express from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import { Server } from "http";
import UserProgressController from "./UserProgress/UserProgressController";
import AuthController from "./AuthModule/AuthController";

export default class App {
  public app: Application = express();
  public server: Server;
  private ip: string = process.env.IP || "0.0.0.0";
  private port: number = parseInt(process.env.PORT) || 8000;
  constructor() {
    // binding everything in here
    this.configureAssets();
    this.configureRequest();
    this.configureTemplateEngine();
    this.mappingControllerToApp();
  }
  private mappingControllerToApp() {
    let controllers = [new UserProgressController(), new AuthController()];
    controllers.forEach((controller) => {
      console.log(controllers);
      this.app.use(controller.basePath, controller.router);
    });
  }
  private configureRequest() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
  private configureAssets() {
    this.app.use(express.static("public"));
  }
  private configureTemplateEngine() {
    this.app.set("view engine", "ejs");
  }
  public startServer() {
    this.server = this.app.listen(this.port, this.ip, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
