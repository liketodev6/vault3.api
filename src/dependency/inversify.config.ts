import { Container } from "inversify";
import 'reflect-metadata';
import IPriceingManager, { PriceingManager } from "../managers/priceing";
import IStorageManager, { StorageManager } from "../managers/storage";
import ITransactionManager, { TransactionManager } from "../managers/transactions";
import IUserManager, { UserManager } from "../managers/user";
import IHashingService, { HashingService } from "../services/hashing";
import IPaymentService, { PaymentService } from "../services/payment";
import IToken, { TokenService } from "../services/token";
import { TYPES } from "./inversify.types";

const myContainer = new Container();
myContainer.bind<IUserManager>(TYPES.userManager).to(UserManager);
myContainer.bind<IToken>(TYPES.tokenService).to(TokenService);
myContainer.bind<IHashingService>(TYPES.hashingService).to(HashingService);
myContainer.bind<IPriceingManager>(TYPES.priceingManager).to(PriceingManager);
myContainer.bind<IStorageManager>(TYPES.storageManager).to(StorageManager);
myContainer.bind<IPaymentService>(TYPES.paymentService).to(PaymentService);
myContainer.bind<ITransactionManager>(TYPES.transactionManager).to(TransactionManager);

export { myContainer };