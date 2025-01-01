import type { Actions } from "./$types";
import { env } from "$env/dynamic/private";
import { Redis } from "@upstash/redis/cloudflare";
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const content = data.get("content");
    const pin = data.get("pin");

    if (pin != env.PIN) {
      return fail(400, { success: false, badPin: true });
    }

    if (content == "") {
      return fail(400, { success: false, noContent: true });
    }

    const key = generateKey();
    const redis = Redis.fromEnv({
      UPSTASH_REDIS_REST_URL: env.REDIS_URL,
      UPSTASH_REDIS_REST_TOKEN: env.REDIS_BEARER_TOKEN,
    });

    await redis.set(key, content, {
      ex: 43200,
    });

    return { success: true, key: key };
  },
} satisfies Actions;

function generateKey(): string {
  const chars = "abcdefghkmnpqrstuvwxyz23456789";
  return Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}
