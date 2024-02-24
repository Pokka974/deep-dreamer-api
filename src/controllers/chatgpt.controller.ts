import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import chatGptService from '../services/chatgpt.service';
import { logError } from '../services/logger.service';

const createChatGptCompletion = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const completion = await chatGptService.getCompletion(prompt);
        res.json({ completion });
    } catch (error) {
        logError(error as string);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            'An error occurred while processing your request.',
        );
    }
};

export default {
    createChatGptCompletion,
};
