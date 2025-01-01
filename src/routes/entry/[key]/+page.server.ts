import type { PageServerLoad } from "./$types";
import { Redis } from "@upstash/redis/cloudflare";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async ({ params }) => {
  const redis = Redis.fromEnv({
    UPSTASH_REDIS_REST_URL: env.REDIS_URL,
    UPSTASH_REDIS_REST_TOKEN: env.REDIS_BEARER_TOKEN,
  });

  const result = await redis.get(params.key);
  if (!result) {
    return {
      success: false,
      message: "no result",
    };
  }
  return {
    success: true,
    content: result as string,
  };
};
