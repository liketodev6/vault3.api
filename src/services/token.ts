import * as jwt from 'jsonwebtoken';
import mainConfig from '../env';
import { User } from '../model/user';
import 'reflect-metadata';
import { injectable } from 'inversify';


@injectable()
export class TokenService implements IToken {

    public create = async (user: User, expireDate?: string): Promise<string> => {
        const token = jwt.sign({ user: user.id, jwtUUID: mainConfig.JWT_UUID, loginAt: new Date() }, mainConfig.SECRET, { expiresIn: expireDate ? expireDate : mainConfig.JWT_EXPIRE });
        return token;
    };

    public verify = async (key: string): Promise<IJwtTokenModel> => {
        const decodedToken: any = jwt.verify(key, mainConfig.SECRET);
        return decodedToken;
    };

};

export default interface IToken {
    create: (user: User, expireDate?: string) => Promise<string>;
    verify: (key: string) => Promise<IJwtTokenModel>;
};

export interface IJwtTokenModel {
    user: string;
    expireDate: string;
};