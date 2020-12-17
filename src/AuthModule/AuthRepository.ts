import User from "./User";
import FirebaseManager from "../firebase";
import { auth } from "firebase-admin";

export default class AuthRepository {
  private authManager: auth.Auth = FirebaseManager.getAuth();
  public async signIn(userEmail: string): Promise<auth.UserRecord> {
    return await this.authManager.getUserByEmail(userEmail);
  }
  public async create(user: User): Promise<auth.UserRecord> {
    return await this.authManager.createUser(user);
  }
}
