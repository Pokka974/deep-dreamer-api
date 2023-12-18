import * as dotenv from 'dotenv';
dotenv.config();
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateDallEImage = async (dreamDescription: string) => {
    console.log(dreamDescription);

    try {
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `${dreamDescription}`,
            n: 1,
            quality: 'standard',
            style: 'natural',
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
