import { addCacheRestaurant, checkCacheRestaurant } from "./cache";
import { getChatgptResponse } from "./openai";
import { getPerplexityResponse } from "./perplexity";
import OpenAI from "openai";

// OpenAI Instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function checkRestaurant(name: string, city: string) {
  const cacheVal = await checkCacheRestaurant(name, city);
  if (cacheVal !== null) {
    console.log("Cache hit value:", cacheVal);
    return cacheVal === "ghost";
  }
  try {
    console.log("checking perplexity");
    // check perplexity
    const perplexityResponse = await getPerplexityResponse(
      `Is ${name} in ${city} a real restaurant or a ghost kitchen?`
    );

    console.log("Perplexity response:", perplexityResponse);

    // parse response into boolean using chatgpt function
    const response = await getChatgptResponse(
      `Given this response from Perplexity: ${perplexityResponse}, is ${name} in ${city} a real restaurant or a ghost kitchen?
        Return the token %%REAL%% if it is a real restaurant, and %%GHOST%% if it is a ghost kitchen. If it is unclear, return %%UNCLEAR%%.
        `
    );

    console.log("ChatGPT response:", response);

    // check if response is real or ghost
    const isGhost = Boolean(response?.includes("GHOST"));

    // add to cache
    await addCacheRestaurant(name, city, isGhost);

    return isGhost;
  } catch (error) {
    console.error("Error checking restaurant:", error);
    return null;
  }
}
