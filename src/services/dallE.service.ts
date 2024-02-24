import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateDallEImage = async (dreamDescription: string) => {
    const systemPrompt = `A painting style about ${dreamDescription}. The painting should always represent the dream's subject even if it has a negative vibe, filled with harmonious colors. The overall atmosphere should be dreamlike and soothing, with a sense of otherworldly beauty.`;
    try {
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: systemPrompt,
            n: 1,
            quality: 'standard',
            size: '1024x1024',
        });

        return response.data[0];
    } catch (error) {
        return error;
    }
};

export default {
    generateDallEImage,
};
