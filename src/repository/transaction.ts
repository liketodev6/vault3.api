import { Transaction } from "ethereumjs-tx";
import { schemaReferences } from "../constants";
import db from "../db/db";
import { Transactions } from "../model/transaction";

export class TransactionRepository {

  public create = async (body: Transactions<number, number>): Promise<Transactions<number, number>> => {
    const transaction: Transactions<number, number>[] = await db.from(schemaReferences.transactions).insert(body).returning('*')
    return transaction[0]
  };  

};
