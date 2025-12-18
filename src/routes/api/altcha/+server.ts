import { json } from '@sveltejs/kit';
import { getAltchaChallenge } from '$lib/server/altcha';

export async function GET() {
    try {
        const challenge = await getAltchaChallenge();
        return json(challenge);
    } catch (err) {
        return json({ error: 'Failed to generate challenge' }, { status: 500 });
    }
}

