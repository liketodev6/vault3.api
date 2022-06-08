import { NextFunction, Response } from "express";
import 'reflect-metadata';
import { getResponse, IRequest } from "../api/mainModels";
import mainConfig from "../env";
import * as jwt from 'jsonwebtoken';
import { inject } from "inversify";
import { TYPES } from "../dependency/inversify.types";
import { myContainer } from "../dependency/inversify.config";
import IUserManager from "../managers/user";
import { User } from "../model/user";
import IHashingService from "./hashing";

interface IJwtVerificationModel {
    status: boolean;
    data: User;
}
/** @param {Array<number>} userTypes */

class JvtValidationService {

    constructor(
        @inject(TYPES.userManager) private UserManager: IUserManager,
        @inject(TYPES.hashingService) private HashService: IHashingService
    ){};

    public createJwtValidation = async (req: IRequest, res: Response, next: NextFunction) => {

        const token = req.headers['x-access-token'];
        if (!token) return res.sendStatus(401);
        const userToken = await this.verifyMongoToken(token.toString());
        if (!userToken.status) return res.sendStatus(401);
        else req.user = userToken.data;
        return next();
    };

    public createJwtHashingValidation = async (req: IRequest, res: Response, next: NextFunction) => {
        const secret = req.headers['token']?.toString();
        if (!secret) return res.sendStatus(401);
        const decodedSecretData = await this.HashService.decryptSecretKey(secret);

        if (!decodedSecretData || !decodedSecretData.status) return res.sendStatus(401);
        const user = await this.UserManager.getById(decodedSecretData.data.userId);
        if (!user) return res.sendStatus(401);
        req.user = user;
        req.userDbKey = decodedSecretData.data.dbKey;
        return next();
    };

    private verifyMongoToken = async (token: string): Promise<IJwtVerificationModel> => {
        try {
            const decoded: any = jwt.verify(token, mainConfig.SECRET);
            const user = await this.UserManager.getById(decoded.user);
            if (new Date(user.logoutAt).getTime() > new Date(decoded.loginAt).getTime() || decoded.jwtUUID != mainConfig.JWT_UUID) {
                return { status: false, data: null };
            }
            return { status: true, data: user };
        } catch (error) {
            console.log(error);
            return { status: false, data: null };
        }

    };
};

/**
 * Middleware checks if user is guest or logged in
 */

const validation = new JvtValidationService(
    myContainer.get<IUserManager>(TYPES.userManager),
    myContainer.get<IHashingService>(TYPES.hashingService)
);

export default {
    validateUser: (req: IRequest, res: Response, next: NextFunction) => validation.createJwtValidation(req, res, next),
    validateUserHash: (req: IRequest, res: Response, next: NextFunction) => validation.createJwtHashingValidation(req, res, next)
};

export interface IJwtDetails {
    _id: string;
}