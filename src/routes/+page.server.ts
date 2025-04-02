import type { Actions } from "./$types";
import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";
import clientPromise from "$lib/db";

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
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('pastes');

    const timeoutHours = parseInt(env.ENTRY_TIMEOUT_HOURS || "12", 10);
    const timeoutMs = timeoutHours * 60 * 60 * 1000;

    await collection.insertOne({
      key,
      content,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + timeoutMs)
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
