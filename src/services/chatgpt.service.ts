import * as dotenv from 'dotenv';
dotenv.config();
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getCompletion = async (userInput: string, maxTokens: number) => {
    const prompt = `Given that dream interpretation is highly subjective and can depend on a variety of factors, provide a detailed interpretation based on common symbols and themes for the following dream: ${userInput}`;
    console.log(prompt);

    const gptResponse = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: maxTokens,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
    });

    return gptResponse.data.choices[0].text;
};

export default {
    getCompletion,
};
