import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import chatGptService from '../services/chatgpt.service';

const createChatGptCompletion = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const completion = await chatGptService.getCompletion(prompt);
        res.json({ completion });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            'An error occurred while processing your request.',
        );
    }
};

export default {
    createChatGptCompletion,
};
