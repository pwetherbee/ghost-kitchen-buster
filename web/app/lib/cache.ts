import { kv } from "@vercel/kv";

export async function addCacheRestaurant(
  name: string,
  city: string,
  isGhost: boolean
) {
  // add to kv store
  await kv.set(`name:${name}&city:${city}`, isGhost ? "ghost" : "real");

  return true;
}

export async function checkCacheRestaurant(name: string, city: string) {
  const result = await kv.get(`name:${name}&city:${city}`);
  return result;
}
