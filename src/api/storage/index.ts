import { Router, Response } from 'express';
import { getErrorResponse, IRequest } from '../mainModels';
import APIError from '../../services/APIError';
import Service from './service';
import Validations from './validation';
import jwtValidations from '../../services/jwtValidations';

class StorageRoutes {
    public router = Router();

    constructor() {
        this.routes();
    };

    private routes() {
        /** GET api/storage/priceing - Functionality for user to get storage priceing*/
        this.router.get('/priceing', this.getPriceing);
        

        /** POST api/storage - Functionality for user to create storage*/
        // this.router.post('/');

    };

    private create = async (req: IRequest, res: Response) => {
        try {
            // const response = await Service.signUp(req.body);
            // return res.send(response);
        } catch (e) {
            new APIError(e, 500, 'create function in storage/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };

    private getPriceing = async (req: IRequest, res: Response) => {
        try {
            const response = await Service.getList();
            return res.send(response);
        } catch (e) {
            new APIError(e, 500, 'getPriceing function in storage/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };

};  

export default new StorageRoutes().router;