export class Transactions<U, S> {
  public id?: number;
  public user: U;
  public storage: S;
  public cost: number;
  public currency: string;
  public createdDt: Date;
  public updatedDt?: Date;
};