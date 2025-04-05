
# Pego

A simple, secure way to share text snippets. Just paste your text, set a pin, and share the link.

## Features

- Share text snippets with a simple link
- Secure with PIN protection
- Automatic deletion after 12 hours (configurable)
- No accounts needed
- Dark/light theme support

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Docker Deployment

1. Create a `.env` file with your configuration:
```bash
PIN="0000"
MONGODB_URI="your_mongodb_connection_string"
ENTRY_TIMEOUT_HOURS="12"
```

2. Build and run with Docker Compose:
```bash
docker-compose up --build
```

The app will be available at http://localhost:3000

## Go Live

To deploy the app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment rather than [Node](https://svelte.dev/docs/kit/adapter-node).

## Environment Variables

- `PIN`: The PIN required to create new entries (default: "0000")
- `MONGODB_URI`: MongoDB connection string
- `ENTRY_TIMEOUT_HOURS`: How long entries should be kept (default: 12)

## Technology Stack

- SvelteKit
- MongoDB
- TailwindCSS
- Docker
