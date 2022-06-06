import * as express from 'express';
import AuthRoutes from './auth';
import StorageRoutes from './storage';

class Routes {

    public router = express.Router();

    constructor() {
        this.routes();
    };

    private routes = () => {
        this.router.use('/auth', AuthRoutes);
        this.router.use('/storage', StorageRoutes);
    };
}

export default new Routes().router;