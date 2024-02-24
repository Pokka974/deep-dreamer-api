import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OpenAI from 'openai';
import chatGptService from '../services/chatgpt.service';
import { logError, logInfo } from '../services/logger.service';

const openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const createChatGptCompletion = async (req: Request, res: Response) => {
    if (!openai) {
        logError('Invalid OpenAI Token');
        res.status(StatusCodes.UNAUTHORIZED).send('Invalid OpenAI Token');
    }

    try {
        const { prompt } = req.body;
        const userId = req.user?.id;

        if (!prompt) {
            logError('Prompt is missing');
            res.status(StatusCodes.BAD_REQUEST).send('Prompt is missing');
        }

        if (!userId) {
            logError('Unable to find related user');
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
                'Unable to find related user',
            );
        }

        const completion = await chatGptService.getCompletion(
            prompt,
            openai,
            userId!,
        );
        logInfo(
            `New Dream completion generated: ${JSON.stringify(completion)}`,
        );
        res.status(StatusCodes.OK).json({ completion });
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
