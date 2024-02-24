import { PrismaClient } from '.prisma/client';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { logError } from './logger.service';
const prisma = new PrismaClient();
dotenv.config();

const generateDallEImage = async (
    dreamDescription: string,
    dreamId: number,
    openai: OpenAI,
) => {
    const systemPrompt = `A painting style about ${dreamDescription}. The painting should always represent the dream's subject even if it has a negative vibe, filled with harmonious colors. The overall atmosphere should be dreamlike and soothing, with a sense of otherworldly beauty.`;
    try {
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: systemPrompt,
            n: 1,
            quality: 'standard',
            size: '1024x1024',
        });

        const imageUrl = response.data[0].url;

        if (!imageUrl) {
            logError('No image URL');
            return new Error('No image URL');
        }

        const dreamUpdated = await prisma.dreamImage.create({
            data: {
                url: imageUrl,
                dreamId: dreamId,
            },
        });

        if (!dreamUpdated) {
            logError('Unable to add the imageUrl to the related dream');
            return new Error('Unable to add the imageUrl to the related dream');
        }
        return response.data[0];
    } catch (error) {
        return error;
    }
};

export default {
    generateDallEImage,
};
