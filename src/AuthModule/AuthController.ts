import { Router, Request, Response } from "express";
import User from "./User";
import AuthService from "./AuthService";
export default class AuthController {
  public router: Router = Router({ mergeParams: true });
  public basePath: string = "/auth";
  private service: AuthService = new AuthService();
  constructor() {
    this.router.post("/signup", this.signUser.bind(this));
  }

  public signUser(req: Request, res: Response) {
    let user = req.body as User;
    console.log(user);
    this.service
      .signOrCreate(user)
      .then((user: User) => {
        res.status(200).json(user);
      })
      .catch((err: Error) => {
        res.status(409).json({
          error: err,
        });
      });
  }
}
