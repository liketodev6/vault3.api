import { inject } from "inversify";
import { myContainer } from "../../dependency/inversify.config";
import { TYPES } from "../../dependency/inversify.types";
import IStorageManager from "../../managers/storage";
import ITransactionManager from "../../managers/transactions";
import IUserManager from "../../managers/user";
import { Transactions } from "../../model/transaction";
import { User } from "../../model/user";
import IHashingService from "../../services/hashing";
import IPaymentService from "../../services/payment";
import IToken from "../../services/token";
import { getResponse, IResponseModel } from "../mainModels";
import { SignUpReqModel } from "./model/req/signUp";
import { ValidatePaymentReqModel } from "./model/req/validatePayment";
import { SignUpResModel } from "./model/res/signUp";

class AuthServices {

  constructor(
    @inject(TYPES.userManager) private UserManager: IUserManager,
    @inject(TYPES.tokenService) private TokenService: IToken,
    @inject(TYPES.hashingService) private HashingService: IHashingService,
    @inject(TYPES.storageManager) private StorageManager: IStorageManager,
    @inject(TYPES.paymentService) private PaymentService: IPaymentService,
    @inject(TYPES.transactionManager) private TransactionManager: ITransactionManager
  ) { };

  public signUp = async (body: SignUpReqModel): Promise<IResponseModel<SignUpResModel>> => {
    const user = await this.UserManager.create(body);
    const token = await this.TokenService.create(user);
    return getResponse(true, 'User created successfuly', new SignUpResModel({ token }));
  };

  public signIn = async (user: User): Promise<IResponseModel<{ username: string, token: string }>> => {
    const token = await this.TokenService.create(user);
    await this.UserManager.signIn(user.id);
    return getResponse(true, 'success', { username: user.username, token });
  };

  public signOut = async (user: User): Promise<IResponseModel<null>> => {
    await this.UserManager.signOut(user.id);
    return getResponse(true, 'success');
  };

  public validatePayment = async (user: User, body: ValidatePaymentReqModel): Promise<IResponseModel<string>> => {
    const pay = await this.PaymentService.validatePayment(body);
    if (!pay.success) return getResponse(true, 'Payment error', null);
    const storage = await this.StorageManager.create(user, body);
    await this.TransactionManager.create({
      user: user.id,
      storage: storage,
      cost: body.estimatedCost,
      currency: body.paymentMethod,
      createdDt: new Date()
    });
    const token = await this.HashingService.generateUserSecretKey(user.id, await this.HashingService.generateDbSecretKey(user.id));
    return getResponse(true, 'Payment successfuly validated', token);
  };

};

export default new AuthServices(
  myContainer.get<IUserManager>(TYPES.userManager),
  myContainer.get<IToken>(TYPES.tokenService),
  myContainer.get<IHashingService>(TYPES.hashingService),
  myContainer.get<IStorageManager>(TYPES.storageManager),
  myContainer.get<IPaymentService>(TYPES.paymentService),
  myContainer.get<ITransactionManager>(TYPES.transactionManager)
);