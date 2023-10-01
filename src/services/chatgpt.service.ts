import * as dotenv from 'dotenv';
dotenv.config();
import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const englishPrompt =
    "Act like you are a dream psychologist and analyze the given dreams by following those instructions: This prompt has several '/' that will split the prompt into categories. The first one is the introduction, the second one is the current dream description, the thrid one on a summary of previous dreams, the fourth one is some keywords related to previous dreams interpretations and the last one is some instructions for you. Given that dream interpretation (before the second '/') is highly subjective and can depend on a variety of factors, provide a detailed interpretation based on common symbols and themes for the following dream:";
const frenchPrompt =
    "Étant donné que l'interprétation des rêves est hautement subjective et peut dépendre de divers facteurs, fournissez une interprétation détaillée basée sur les symboles et thèmes communs pour le rêve suivant :";

const getCompletion = async (userInput: string, maxTokens: number) => {
    if (!userInput) {
        return ''; // Return empty string if userInput is empty
    }

    const prompt = `${englishPrompt} 
    Current Dream Description:/
    ${userInput}/
    Dream Distory:
    - Dream 1: I have dreamed about being biten by a snake
    - Dream 2: I have dreamed about have super powers like superman
    - Dream 3: I have dreamed about my mom when I was a kid/
    Interpretation key words:
    transformation growing changes negative invincible power security safety/
    Please provide an interpretation for the current dream divided in two parts, 
    the first part I need you to interpret the current dream 
    (start this part with 'Current dream interpretation:\n') and 
    the second part taking into account the user's dream history 
    if you can make a link between them and the current dream (not mandatory) 
    (start this part with 'Possible links with your dreams's history:\n').
    `;

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
    // const interpretation = responseText
    //     ?.substring(responseText.indexOf('\n') + 1)
    //     .trim();
    return responseText;
};

export default {
    getCompletion,
};
