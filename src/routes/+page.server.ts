import type { Actions } from "./$types";
import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";
import getDbClient from "$lib/db";
import { creationLimiter } from "$lib/server/limiter";
import { verifyAltcha } from "$lib/server/altcha";

export const actions = {
  default: async (event) => {
    const { request } = event;
    
    // Rate limit check
    if (await creationLimiter.isLimited(event)) {
      return fail(429, { success: false, retryAfter: true });
    }

    const data = await request.formData();
    const content = data.get("content") as string;
    const pin = data.get("pin") as string;
    const altchaPayload = data.get("altcha") as string;

    // ALTCHA verification
    const isValid = altchaPayload && (await verifyAltcha(altchaPayload));

    if (!isValid) {
      return fail(400, { success: false, captchaFailed: true, content, pin });
    }

    if (content == "") {
      return fail(400, { success: false, noContent: true, pin });
    }

    let key = generateKey();
    const client = await getDbClient();
    const db = client.db();
    const collection = db.collection('pastes');

    // Ensure key uniqueness
    let attempts = 0;
    while (attempts < 5) {
      const existing = await collection.findOne({ key, expiresAt: { $gt: new Date() } });
      if (!existing) break;
      key = generateKey();
      attempts++;
    }

    const timeoutHours = parseInt(env.ENTRY_TIMEOUT_HOURS || "12", 10);
    const timeoutMs = timeoutHours * 60 * 60 * 1000;

    await collection.insertOne({
      key,
      content,
      pin: pin || null,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + timeoutMs)
    });

    return { success: true, key: key };
  },
} satisfies Actions;

function generateKey(): string {
  const chars = "abcdefghkmnpqrstuvwxyz23456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}
