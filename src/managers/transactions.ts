import { Transactions } from "../model/transaction";
import { injectable } from "inversify";
import { TransactionRepository } from "../repository/transaction";

@injectable()
export class TransactionManager implements ITransactionManager {

  public get TransactionRepo () {
    return new TransactionRepository();
  };

  public create = async (body: Transactions<number, number>) => {
    return await this.TransactionRepo.create(body);
  };

};

export default interface ITransactionManager {
  create: (body: Transactions<number, number>) => Promise<Transactions<number, number>>;
};  