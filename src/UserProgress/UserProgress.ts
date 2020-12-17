class UserProgress {
  public id: string | undefined;
  public userId: string;
  public unlockedBg: number;
  public date: Date;
  public isUnlock: boolean;
  public dailyExp: number;
  constructor(userProgress: {
    id?: string;
    userId: string;
    unlockedBg: number;
    date: Date;
    isUnlock: boolean;
    dailyExp: number;
  }) {
    this.userId = userProgress.userId;
    this.unlockedBg = userProgress.unlockedBg;
    this.date = userProgress.date;
    this.isUnlock = userProgress.isUnlock;
    this.dailyExp = userProgress.dailyExp;
  }
}

export default UserProgress;
