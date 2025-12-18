
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
4. Connect your repository and deploy.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string.
- `ORIGIN`: The public URL of your application (e.g., `https://pego.discreto.art`). Required for production.
- `ENTRY_TIMEOUT_HOURS`: How long entries should be kept (default: 12).
- `PORT`: The internal port the app listens on (default: 3000).

## Technology Stack

- SvelteKit
- MongoDB
- TailwindCSS
- Docker
