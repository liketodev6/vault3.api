import { injectable } from "inversify";
import * as tx from 'ethereumjs-tx';
import { ValidatePaymentReqModel } from "../api/auth/model/req/validatePayment";
const Tx = tx.Transaction;
const Web3 = require('web3');

// https://ropsten.infura.io/v3/

@injectable()
export class PaymentService implements IPaymentService {

  // private readonly web3 = new Web3('https://mainnet.infura.io/v3/62f8c835a21d436092d9027e2e8b786d');
  private readonly web3 = new Web3('https://kovan.infura.io/v3/62f8c835a21d436092d9027e2e8b786d');
  private readonly privateKey = 'c429601ee7a6167356f15baa70fd8fe17b0325dab7047a658a31039e5384bffd';
  private readonly account = '0x3266F6438d7F039dBb5a52826A163CE617ed5579';

  public validatePayment = async (body: ValidatePaymentReqModel) => {
    
    const transaction = await this.web3.eth.getTransaction(body.transactionId);
    if (transaction) {
      return { success: true, message: 'ok', data: transaction } 
    }

    return { success: false, message: 'Transaction faild', data: null } 
  }

};

export default interface IPaymentService {
  validatePayment: (body: ValidatePaymentReqModel) => Promise<{ success: boolean, message: string, data: any }>;
};