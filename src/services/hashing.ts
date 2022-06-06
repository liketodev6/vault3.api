import { injectable } from "inversify";
import * as CryptoJS from 'crypto-js';
import mainConfig from "../env";

@injectable()
export class HashingService implements IHashingService {

  public encrypt = async (str: string) => {
    const ciphertext = CryptoJS.AES.encrypt(str, 'secret key 123').toString();
    return ciphertext
  };

  public decrypt = async (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  };

  public generateUserSecretKey = async (userId: number, dbKey: string) => {
    const [key, value] = await Promise.all([
      this.encrypt('userId'),
      this.encrypt(JSON.stringify([mainConfig.SECRET_HASH, userId, mainConfig.SECRET_HASH, dbKey]))
    ]);

    const token = await this.encrypt(JSON.stringify([key + mainConfig.SECRET_CONNECTOR + value]));
    return token;
  };

  public decryptSecretKey = async (token: string): Promise<{status: boolean, data: { userId: number, dbKey: string }}> => {
    let response = { status: false, data: null };
    const setp1: string[] = JSON.parse(await this.decrypt(token));
    const index = setp1[0].indexOf(mainConfig.SECRET_CONNECTOR);

    let key: string = setp1[0].slice(0, index),
      value: string = setp1[0].slice(index + mainConfig.SECRET_CONNECTOR.length, setp1[0].length),
      connector: string = setp1[0].slice(index, index + mainConfig.SECRET_CONNECTOR.length);
    if (!key || !value || !connector) return response;

    let decodedKey = await this.decrypt(key),
      decodedValue: string[] = JSON.parse(await this.decrypt(value));

    if (!decodedKey || (decodedKey !== 'userId') || !decodedValue || (!Array.isArray(decodedValue))) return response;
    if (!decodedValue.length || decodedValue.length !== 4 || decodedValue[0] !== mainConfig.SECRET_HASH || decodedValue[2] !== mainConfig.SECRET_HASH) return response;
    if (!decodedValue[3] || !decodedValue[3].length) return response;

    response.status = true;
    response.data = { [decodedKey]: decodedValue[1], dbKey: decodedValue[3] };
    return response;
  };

  public generateDbSecretKey = async (userId: number): Promise<string> => CryptoJS.AES.encrypt(userId.toString(), mainConfig.DB_SECRET).toString();

};

export default interface IHashingService {
  generateUserSecretKey: (str: number, dbKey: string) => Promise<string>;
  decryptSecretKey: (str: string) => Promise<{ status: boolean, data: { userId: number, dbKey: string } }>;
  generateDbSecretKey: (id: number) => Promise<string>;
};