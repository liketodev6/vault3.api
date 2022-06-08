import * as Joi from 'joi';
import { NextFunction, Response } from "express";
import APIError from "../../services/APIError";
import { getErrorResponse, getResponse, IRequest } from "../mainModels";
import { CreateFolderReqModel } from './model/req/createFolder';

class FilesValidation {

  public createFolder = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const body: CreateFolderReqModel = new CreateFolderReqModel(req.body);
        const bodyValidationSchema = {
          name: Joi.string().min(1).required(),
          parentId: Joi.number().allow([null]).optional()
        };
        const result = Joi.validate(body, bodyValidationSchema);
        if (result.error) return res.status(400).send(getResponse(false, result.error.details[0].message));


        req.body = body;
        return next();
    } catch (error) {
      new APIError(error, 400, 'createFolder function in files/validation.ts');
      res.status(400).send(getErrorResponse());
    };
  };

};

export default new FilesValidation();