import { createChallenge, verifySolution } from 'altcha-lib';
import { env } from '$env/dynamic/private';

// In production, you should set ALTCHA_HMAC_KEY in your environment
const HMAC_KEY = env.ALTCHA_HMAC_KEY || 'default-dev-key-change-this-in-production';

export async function getAltchaChallenge() {
    return createChallenge({
        hmacKey: HMAC_KEY,
        maxNumber: 100000, // Difficulty level
    });
}

export async function verifyAltcha(payload: string) {
    return verifySolution(payload, HMAC_KEY);
}

