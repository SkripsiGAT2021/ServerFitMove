import { Router, Request, Response } from "express";
import UserProgress from "./UserProgress";
import UserPorgressService from "./UserProgressServices";
export default class UserProgressController {
  public router: Router = Router({ mergeParams: true });
  public basePath: string = "/userprogress";
  private service: UserPorgressService = new UserPorgressService();
  constructor() {
    this.router.get("/:userId", this.getUserProgress.bind(this));
    this.router.post("/", this.createOrUpdateUserProgress.bind(this));
  }

  public getUserProgress(req: Request, res: Response) {
    let userId = req.params.userId;
    console.log(userId);
    this.service
      .getWithId(userId)
      .then((userProgress: UserProgress) => {
        res.status(200).json(userProgress);
      })
      .catch((err: Error) => {
        res.status(409).json({
          error: err,
        });
      });
  }

  public createOrUpdateUserProgress(req: Request, res: Response) {
    let userProg = req.body as UserProgress;
    console.log(userProg);
    this.service
      .createOrUpdate(userProg)
      .then(() => {
        res.status(201).json({
          message: "UserProg Created",
        });
      })
      .catch((err: Error) => {
        return res.status(409).json({
          error: err,
        });
      });
  }
}
