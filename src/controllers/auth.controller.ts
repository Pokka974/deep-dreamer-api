import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.BAD_REQUEST).send(errorMessage);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { user, token } = await authService.login(req.body);
        res.json({ user, token });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(StatusCodes.UNAUTHORIZED).send(errorMessage);
    }
};
