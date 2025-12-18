import type { PageServerLoad, Actions } from "./$types";
import clientPromise from "$lib/db";
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const client = await clientPromise;
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
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    const pin = data.get("pin");

    const client = await clientPromise;
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
    };
  }
};
