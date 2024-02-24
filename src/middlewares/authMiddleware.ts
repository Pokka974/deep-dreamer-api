import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { logInfo, logWarn } from '../services/logger.service';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        logWarn('Not authorized to access this route without a valid token');
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send('Not authorized to access this route');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        req.user = { id: decoded.userId, email: decoded.email };
        logInfo(`${req.user.email} authorized to access this route`);
        next();
    } catch (error) {
        logWarn('Not authorized');
        res.status(StatusCodes.UNAUTHORIZED).send('Not authorized');
    }
};
