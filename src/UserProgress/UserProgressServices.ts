import UserProgress from "./UserProgress";
import UserPorgressRepository from "./UserProgressRepository";

export default class UserPorgressService {
  private repository: UserPorgressRepository = new UserPorgressRepository();
  public async createOrUpdate(userProgress: UserProgress) {
    await this.repository.update(userProgress.userId, userProgress);
  }

  public async getWithId(id: string): Promise<UserProgress> {
    let ref = await this.repository.getWithId(id);
    let { userId, unlockedBg, date, isUnlock, dailyExp } = await ref.data();
    return {
      id: ref.id,
      userId,
      unlockedBg,
      date,
      isUnlock,
      dailyExp,
    } as UserProgress;
  }
}
