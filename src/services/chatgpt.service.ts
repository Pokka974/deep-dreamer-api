import * as dotenv from 'dotenv';
dotenv.config();
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const englishPrompt =
    'Given that dream interpretation is highly subjective and can depend on a variety of factors, provide a detailed interpretation based on common symbols and themes for the following dream:';
const frenchPrompt =
    "Étant donné que l'interprétation des rêves est hautement subjective et peut dépendre de divers facteurs, fournissez une interprétation détaillée basée sur les symboles et thèmes communs pour le rêve suivant :";

const getCompletion = async (userInput: string, maxTokens: number) => {
    if (!userInput) {
        return ''; // Return empty string if userInput is empty
    }

    const prompt = `${frenchPrompt} ${userInput}`;

    const gptResponse = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: maxTokens,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
    });

    const responseText: string | undefined = gptResponse.data.choices[0].text;
    const interpretation = responseText
        ?.substring(responseText.indexOf('\n') + 1)
        .trim();
    return interpretation;
};

export default {
    getCompletion,
};
