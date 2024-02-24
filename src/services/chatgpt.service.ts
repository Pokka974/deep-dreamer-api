import { PrismaClient } from '.prisma/client';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { ChatCompletionMessage } from 'openai/resources';
import { logError } from './logger.service';
const prisma = new PrismaClient();

dotenv.config();

const getCompletion = async (
    prompt: string,
    openai: OpenAI,
    userId: number,
) => {
    const gptResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `You are a dream psychologist, your answer must always follow that pattern (replace the content between the []): "Dreaming about [dream short summary]: [interpretation of the dream]", analyze the given dream:`,
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    });

    const responseText: ChatCompletionMessage = gptResponse.choices[0].message;
    const interpretation = responseText?.content;

    if (!interpretation) {
        logError('No response from GPT-3');
        throw new Error('No response from GPT-3');
    }

    // Save dream to database
    const savedDream = await prisma.dream.create({
        data: {
            description: prompt,
            interpretation: interpretation,
            userId,
        },
    });

    return savedDream;
};

export default {
    getCompletion,
};
