import OpenAI from "openai";

// OpenAI Instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//for now, only takes one schema object and name
export async function getChatgptResponse(
  prompt: string,
  temperature: number = 0.7
) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature,
  });
  return completion.choices[0].message.content;
}
