import * as Joi from 'joi';
import { NextFunction, Response } from "express";
import { getErrorResponse, getResponse, IRequest } from "../mainModels";
import APIError from '../../services/APIError';
import { SignUpReqModel } from './model/req/signUp';
import { ValidatePaymentReqModel } from './model/req/validatePayment';
import StorageHelper from '../../helpers/storage';
import { currencies } from '../../constants';

class AuthValidation {

  public signUp = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const body: SignUpReqModel = new SignUpReqModel(req.body);
      const bodyValidationSchema = {
        email: Joi.string().email().required(),
        username: Joi.string().min(4).required()
      };

      const result = Joi.validate(body, bodyValidationSchema);
      if (result.error) {
        return res.status(400).send(getResponse(false, result.error.details[0].message));
      };

      req.body = body;
      return next();
    } catch (error) {
      new APIError(error, 400, 'SignUp function in auth/validation.ts');
      res.status(400).send(getErrorResponse());
    };
  };

  public validatePayment = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const body: ValidatePaymentReqModel = new ValidatePaymentReqModel(req.body);
      const bodyValidationSchema = {
        transactionId: Joi.string().required(),
        storageSize: Joi.number().not([null]).min(StorageHelper.parceFromKbToGb(25)).required(),
        estimatedCost: Joi.number().not([null, 0]).required(),
        paymentMethod: Joi.string().allow(currencies).required(),
        expireDate: Joi.date().required()
      };

      const result = Joi.validate(body, bodyValidationSchema);
      if (result.error) {
        return res.status(400).send(getResponse(false, result.error.details[0].message));
      };

      req.body = body;
      return next();
    } catch (error) {
      new APIError(error, 400, 'validatePayment function in auth/validation.ts');
      res.status(400).send(getErrorResponse());
    };
  };

  public signIn = async (req: IRequest, res: Response, next: NextFunction) => {
    try {

      return next();
    } catch (error) {
      new APIError(error, 400, 'signIn function in auth/validation.ts');
      res.status(400).send(getErrorResponse());
    };
  };

};

export default new AuthValidation();