import { Router, Response } from 'express';
import { getErrorResponse, IRequest } from '../mainModels';
import APIError from '../../services/APIError';
import Service from './service';
import Validations from './validation';
import jwtValidations from '../../services/jwtValidations';

class AuthRoutes {
    public router = Router();

    constructor() {
        this.routes();
    };

    private routes() {

        /** POST api/auth/signUp - Functionality for user to create an account and storage*/
        this.router.post('/signUp', Validations.signUp, this.signUp);

        /** PUT api/auth/validatePayment - Functionality for users to make valid their payment */
        this.router.put('/validatePayment', jwtValidations.validateUser, Validations.validatePayment, this.validatePayment);
        // this.router.put('/validatePayment', this.validatePayment);

        /** POST api/auth/signIn    - Functionality for users to sign in) */
        this.router.post('/signIn', jwtValidations.validateUserHash, Validations.signIn, this.signIn);

        /** PUT api/auth/signOut    - Functionality for users to sign out) */
        this.router.put('/signOut', jwtValidations.validateUserHash, this.signOut);
    };

    private signUp = async (req: IRequest, res: Response) => {
        try {
            const response = await Service.signUp(req.body);
            return res.send(response);
        } catch (e) {
            new APIError(e, 500, 'signUp function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };

    private validatePayment = async (req: IRequest, res: Response) => {
        try {
            const response = await Service.validatePayment(req.user, req.body);
            return res.send(response);
        } catch (e) {
            new APIError(e, 500, 'signUp function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };

    private signIn = async (req: IRequest, res: Response) => {
        try {
            const response = await Service.signIn(req.user);
            return res.send(response);
        } catch (e) {
            new APIError(e, 500, 'signIn function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };

    private signOut = async (req: IRequest, res: Response) => {
        try {
            const response = await Service.signOut(req.user);
            return res.send(response);
        } catch (e) {
            new APIError(e, 500, 'signOut function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };
};

export default new AuthRoutes().router;