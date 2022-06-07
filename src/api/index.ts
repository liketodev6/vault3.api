import * as express from 'express';
import AuthRoutes from './auth';
import StorageRoutes from './storage';
import PaymentRoutes from './payment';

class Routes {

    public router = express.Router();

    constructor() {
        this.routes();
    };

    private routes = () => {
        this.router.use('/auth', AuthRoutes);
        this.router.use('/storage', StorageRoutes);
        this.router.use('/payment', PaymentRoutes);
    };
}

export default new Routes().router;