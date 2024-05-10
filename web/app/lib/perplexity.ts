import OpenAI from "openai";

// OpenAI Instance
const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

//for now, only takes one schema object and name
export async function getPerplexityResponse(
  prompt: string,
  temperature: number = 0.7
) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3-sonar-large-32k-online",
    temperature,
  });
  return completion.choices[0].message.content;
}
