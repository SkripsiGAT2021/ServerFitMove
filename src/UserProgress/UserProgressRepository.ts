import { firestore } from "firebase-admin";
import FirebaseManager from "../firebase";
import UserProgress from "./UserProgress";

export default class UserProgressRepository {
  private db: FirebaseFirestore.CollectionReference = FirebaseManager.getCollectionReference(
    "userProgress"
  );

  public async create(userProg: UserProgress) {
    await this.db.doc().set(userProg);
  }
  public async getWithId(
    id: string
  ): Promise<FirebaseFirestore.DocumentSnapshot> {
    return await this.db.doc(id).get();
  }
  public async update(id: string, userProg: UserProgress) {
    let currProgress = await this.getWithId(id);
    await this.db.doc(id).set({
      ...currProgress.data(),
      ...userProg,
    });
  }
}
