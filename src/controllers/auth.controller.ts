import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as authService from '../services/auth.service';
import { logError, logInfo } from '../services/logger.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { user, token } = await authService.register(req.body);
        logInfo(`Successfuly created user ${JSON.stringify(user)}`);
        res.status(StatusCodes.CREATED).json({ user, token });
    } catch (error) {
        const errorMessage = (error as Error).message;
        logError(errorMessage);
        res.status(StatusCodes.BAD_REQUEST).send(errorMessage);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { user, token } = await authService.login(req.body);
        logInfo(`Successfuly logged in ${JSON.stringify(user)}`);
        res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
        const errorMessage = (error as Error).message;
        logError(errorMessage);
        res.status(StatusCodes.UNAUTHORIZED).send(errorMessage);
    }
};
