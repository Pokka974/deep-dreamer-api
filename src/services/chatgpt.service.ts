import * as dotenv from 'dotenv';
dotenv.config();
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log(configuration.apiKey);

const openai = new OpenAIApi(configuration);

const getCompletion = async (prompt: string, maxTokens: number) => {
    const gptResponse = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt,
        max_tokens: maxTokens,
        temperature: 0,
    });

    return gptResponse.data.choices[0].text;
};

export default {
    getCompletion,
};
