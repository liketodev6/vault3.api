import { StoragePaymentStatusEnum, UserActivityStatusEnum } from "../constants/enums";

export class User {
  public id?: number;
  public username: string;
  public email: string;
  public logoutAt?: Date;
  public createdDt: Date;
  public updatedDt?: Date;
  public isLoggedId?: boolean;
  public activityStatus: UserActivityStatusEnum;
  public storagePaymentStatus: StoragePaymentStatusEnum;
};