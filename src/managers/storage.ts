import { injectable } from "inversify";
import { ValidatePaymentReqModel } from "../api/auth/model/req/validatePayment";
import { User } from "../model/user";
import { StorageRepository } from "../repository/storage";

@injectable()
export class StorageManager implements IStorageManager {

  public get StorageRepo() {
    return new StorageRepository();
  };

  public create = async (user: User, body: ValidatePaymentReqModel) => {
    return await this.StorageRepo.create(user, body);
  };

};

export default interface IStorageManager {
  create: (user: User, body: ValidatePaymentReqModel) => Promise<number>;
};