export class ValidatePaymentReqModel {

  constructor(data: ValidatePaymentReqModel) {
    this.transactionId = data.transactionId;
    this.paymentMethod = data.paymentMethod;
    this.estimatedCost = data.estimatedCost;
    this.storageSize = data.storageSize;
    this.expireDate = data.expireDate;
  };

  public transactionId: string;
  public storageSize: number;
  public estimatedCost: number;
  public paymentMethod: string;
  public expireDate: Date;
};