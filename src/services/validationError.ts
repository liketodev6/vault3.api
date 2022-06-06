import { Response } from 'express';
import { getResponse } from '../api/mainModels';

class ValidationError extends Error {
    constructor(res: Response, message: string) {
        super();
        this.message = message;
        this.send(res);
    };
    public message: string;

    public send = async (res: Response): Promise<void> => {
        res.status(400).send(getResponse(false, this.message));
    };
};

export default ValidationError;