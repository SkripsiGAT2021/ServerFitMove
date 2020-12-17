import AuthRepository from "./AuthRepository";
import User from "./User";
export default class AuthService {
  private repository: AuthRepository = new AuthRepository();
  public async signOrCreate(user: User): Promise<User> {
    try {
      let { uid } = await this.repository.signIn(user.email);
      return {
        ...user,
        id: uid,
      } as User;
    } catch (err) {
      if (err.code == "auth/user-not-found") {
        try {
          let { uid } = await this.repository.create(user);
          return {
            ...user,
            id: uid,
          } as User;
        } catch (err) {
          throw err;
        }
      } else {
        throw err;
      }
    }
  }
}
