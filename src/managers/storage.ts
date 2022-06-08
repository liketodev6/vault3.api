import { injectable } from "inversify";
import { ValidatePaymentReqModel } from "../api/auth/model/req/validatePayment";
import { User } from "../model/user";
import { StorageRepository } from "../repository/storage";
import { Storage } from '../model/storage';

@injectable()
export class StorageManager implements IStorageManager {

  public get StorageRepo() {
    return new StorageRepository();
  };

  public create = async (user: User, body: ValidatePaymentReqModel) => {
    return await this.StorageRepo.create(user, body);
  };

  public findByUserId = async (userId: number): Promise<Storage<number>> => {
    return await this.StorageRepo.findByUserId(userId);
  };

};

export default interface IStorageManager {
  create: (user: User, body: ValidatePaymentReqModel) => Promise<number>;
  findByUserId: (userId: number) => Promise<Storage<number>>;
};