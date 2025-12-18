import type { PageServerLoad, Actions } from "./$types";
import getDbClient from "$lib/db";
import { error, fail } from '@sveltejs/kit';
import { pinLimiter } from "$lib/server/limiter";

export const load: PageServerLoad = async ({ params }) => {
  const client = await getDbClient();
  const db = client.db();
  const collection = db.collection('pastes');

  const result = await collection.findOne({ 
    key: params.key,
    expiresAt: { $gt: new Date() }
  });

  if (!result) {
    error(404, {
      message: 'Entry not found or has expired'
    });
  }

  const isProtected = !!result.pin;

  return {
    success: true,
    protected: isProtected,
    content: isProtected ? null : result.content as string,
    expiresAt: result.expiresAt instanceof Date ? result.expiresAt.toISOString() : null
  };
};

export const actions: Actions = {
  default: async (event) => {
    const { request, params } = event;

    // Rate limit check for PIN attempts
    if (await pinLimiter.isLimited(event)) {
      return fail(429, { message: 'Too many attempts. Please try again later.' });
    }

    const data = await request.formData();
    const pin = data.get("pin");

    const client = await getDbClient();
    const db = client.db();
    const collection = db.collection('pastes');

    const result = await collection.findOne({ 
      key: params.key,
      expiresAt: { $gt: new Date() }
    });

    if (!result) {
      return fail(404, { message: 'Entry not found' });
    }

    if (result.pin && result.pin !== pin) {
      return fail(401, { badPin: true });
    }

    return {
      success: true,
      content: result.content as string,
      expiresAt: result.expiresAt instanceof Date ? result.expiresAt.toISOString() : null
    };
  }
};
