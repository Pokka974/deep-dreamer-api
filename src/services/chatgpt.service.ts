import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { ChatCompletionMessage } from 'openai/resources';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// const englishPrompt =
//     "Act like you are a dream psychologist and analyze the given dreams by following those instructions: This prompt has several '/' that will split the prompt into categories. The first one is the introduction, the second one is the current dream description, the thrid one on a summary of previous dreams, the fourth one is some keywords related to previous dreams interpretations and the last one is some instructions for you. Given that dream interpretation (before the second '/') is highly subjective and can depend on a variety of factors, provide a detailed interpretation based on common symbols and themes for the following dream:";
// const frenchPrompt =
//     "Étant donné que l'interprétation des rêves est hautement subjective et peut dépendre de divers facteurs, fournissez une interprétation détaillée basée sur les symboles et thèmes communs pour le rêve suivant :";

const getCompletion = async (prompt: string) => {
    if (!prompt) {
        return ''; // Return empty string if userInput is empty
    }

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
    const responseTextString = responseText.content;

    if (responseTextString) {
        return responseTextString;
    } else {
        throw new Error('No response from GPT-3');
    }
};

export default {
    getCompletion,
};
