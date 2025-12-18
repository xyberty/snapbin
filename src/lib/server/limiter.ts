import { RateLimiter } from 'sveltekit-rate-limiter/server';

// Limiter for creating new pastes
// Allow 5 pastes per minute, and 20 per hour per IP
export const creationLimiter = new RateLimiter({
  IP: [5, 'm'],
  IPUA: [20, 'h']
});

// Limiter for PIN attempts
// Allow 10 attempts per minute per IP
export const pinLimiter = new RateLimiter({
  IP: [10, 'm'],
  IPUA: [50, 'h']
});

