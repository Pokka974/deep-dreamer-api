import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import dallEService from '../services/dallE.service';
import { logError } from '../services/logger.service';

const generateDallEImage = async (req: Request, res: Response) => {
    try {
        const { dreamDescription } = req.body;
        const image = await dallEService.generateDallEImage(dreamDescription);
        if (image) {
            res.send(image);
        }
    } catch (error) {
        logError(error as string);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            'An error occurred while processing your request.',
        );
    }
};

export default {
    generateDallEImage,
};
