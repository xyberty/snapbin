
# Pego

A simple, secure way to share text snippets. Just paste your text, optionally set a pin, and share the link.

## Features

- Share text snippets with a simple link
- Optional per-entry PIN protection
- Automatic deletion after 12 hours (configurable)
- No accounts needed
- Dark/light theme support
- Privacy-focused: no logging of content

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Docker Compose (Local)

1. Create a `.env` file with your configuration:
```bash
MONGODB_URI="mongodb://localhost:27017/pego"
ENTRY_TIMEOUT_HOURS="12"
```

2. Build and run:
```bash
docker compose up --build
```

The app will be available at http://localhost:3000.

### CapRover Deployment

1. Create a new app in CapRover.
2. Set the **Container Port** to `3000`.
3. Add the following **Environment Variables** in the App Config:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `ORIGIN`: `https://your-domain.com` (Required for SvelteKit styles/links).
   - `ENTRY_TIMEOUT_HOURS`: `12` (Optional).
   - `ADDRESS_HEADER`: `x-forwarded-for` (Required for rate limiting to work behind the proxy).
4. Connect your repository and deploy.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string.
- `ORIGIN`: The public URL of your application (e.g., `https://pego.discreto.art`). Required for production.
- `ALTCHA_HMAC_KEY`: A long random string used for security challenges.
- `ENTRY_TIMEOUT_HOURS`: How long entries should be kept (default: 12).
- `PORT`: The internal port the app listens on (default: 3000).

### Reverse Proxy Configuration

If you are running Pego behind a reverse proxy (like Nginx, Traefik, or on platforms like CapRover/Coolify), you may need to set these variables so SvelteKit can correctly identify client IPs and protocols:

- `ADDRESS_HEADER`: Usually `x-forwarded-for`.
- `PROTOCOL_HEADER`: Usually `x-forwarded-proto`.
- `HOST_HEADER`: Usually `x-forwarded-host`.

**Note:** Do not set these in local development without a proxy, or the application will fail to start.

## Technology Stack

- SvelteKit
- MongoDB
- TailwindCSS
- Docker
