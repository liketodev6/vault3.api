import { Router, Response } from 'express';
import jwtValidations from '../../services/jwtValidations';
import Validations from './validation';
import Service from './service';
import { getErrorResponse, IRequest } from '../mainModels';
import APIError from '../../services/APIError';

class FilesRoutes {

  constructor() {
    this.routes();
  }

  public router = Router();

  private routes () {
    /** POST api/files/createFolder - Functionality for users to create folder on storage */
    this.router.post('/createFolder', jwtValidations.validateUserHash, Validations.createFolder, this.createFolder);
  };


  private createFolder = async (req: IRequest, res: Response) => {
    try {
      const result = await Service.createFolder(req.user, req.body);
      return res.send(result);
    } catch (e) {
      new APIError(e, 500, 'createFolder function in files/service.ts');
      res.status(500).send(getErrorResponse());
    };
  };

};

export default new FilesRoutes().router;