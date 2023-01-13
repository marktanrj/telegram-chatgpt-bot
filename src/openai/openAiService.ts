import openai from './openAiConfig';

const createChatCompletion = async (input: string) => {
  const prompt = `
This is a conversation between an AI chatbot that fulfills the prompts that are given to it in a friendly tone.

Hi, can you help me?
AI chatbot: Sure, how can I help?
Person: ${input}
AI chatbot:
`;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1024,
  
    // Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones with a well-defined answer.
    temperature: 0.5,
  })

  const textReponse = completion.data?.choices[0]?.text;
  if (!textReponse) {
    throw new Error('Error');
  }

  return textReponse;
};

export {
  createChatCompletion,
}