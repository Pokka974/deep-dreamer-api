import { Request, Response } from 'express';
import chatGptService from '../services/chatgpt.service';

const createChatGptCompletion = async (req: Request, res: Response) => {
    try {
        const { userInput, maxTokens = 300 } = req.body;
        const completion = await chatGptService.getCompletion(
            userInput,
            maxTokens,
        );
        res.json({ completion });
    } catch (error) {
        console.error(error);
        res.status(500).send(
            'An error occurred while processing your request.',
        );
    }
};

export default {
    createChatGptCompletion,
};
