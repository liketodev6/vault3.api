import { Router, Response } from 'express';
import { getErrorResponse, IRequest } from '../mainModels';
import APIError from '../../services/APIError';
import Service from './service';
import Validations from './validation';
import jwtValidations from '../../services/jwtValidations';

class PaymentRoutes {
    public router = Router();

    constructor() {
        this.routes();
    };

    private routes() {

        /** GET api/payment/credientals - Functionality for user to get payment credientals*/
        this.router.get('/credientals', Validations.getCredientals, this.getCredientals);

    };

    private getCredientals = async (req: IRequest, res: Response) => {
        try {
          const response = await Service.getCredientals();
          return res.send(response);
        } catch (e) {
            new APIError(e, 500, 'getCredientals function in payments/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };

};

export default new PaymentRoutes().router;