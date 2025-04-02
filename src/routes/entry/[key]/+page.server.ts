import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
import clientPromise from "$lib/db";
import { error } from '@sveltejs/kit';

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

  return {
    success: true,
    content: result.content as string,
  };
};
