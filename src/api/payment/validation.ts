import { NextFunction, Response } from "express";
import APIError from "../../services/APIError";
import { getErrorResponse, IRequest } from "../mainModels";

class PaymentValidateion {

  public getCredientals = async (req: IRequest, res: Response, next: NextFunction) => {
    try {

      return next();
    } catch (error) {
      new APIError(error, 400, 'getCredientals function in payment/validation.ts');
      res.status(400).send(getErrorResponse());
    };
  };

};

export default new PaymentValidateion();

