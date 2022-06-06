import { SignUpReqModel } from "../api/auth/model/req/signUp";
import { User } from "../model/user";
import UserSchema from "../schema/user";
import db from '../db/db';
import { schemaReferences } from "../constants";
import { StoragePaymentStatusEnum, UserActivityStatusEnum } from "../constants/enums";

export class UserRepository {

  public create = async (body: SignUpReqModel): Promise<any> => {
    const userModel: User = {
      createdDt: new Date(),
      email: body.email,
      username: body.username,
      activityStatus: UserActivityStatusEnum.acitve,
      storagePaymentStatus: StoragePaymentStatusEnum.payed
    }
    const user = await db.insert(userModel).from(schemaReferences.user).returning(['id', 'createdDt', 'email', 'username', 'activityStatus', 'storagePaymentStatus']);
    return user[0];
  };

  public getById = async (id: number): Promise<User> => {
    return await db.from(schemaReferences.user).first().where({
      id: id
    })
  };

  public signIn = async (id: number): Promise<void> => {
    await db.from(schemaReferences.user).update({ isLoggedId: true })
      .where({
        id
      });
  };

  public signOut = async (id: number): Promise<void> => {
    await db.from(schemaReferences.user).update({ isLoggedId: false, logoutAt: "now()" })
      .where({
        id
      });
  };

};    