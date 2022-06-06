import { Response } from 'express';
import { getErrorResponse } from '../api/mainModels';

class ServerError extends Error {
    constructor(res: Response) {
        super();
        this.res = res;
        this.send();
    };
    private res: Response;

    private send = async () => {
        this.res.status(500).send(getErrorResponse());
    };
};

export default ServerError;