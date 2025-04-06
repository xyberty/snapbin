# Build stage
FROM node:20-alpine AS builder
WORKDIR /build

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the project
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built assets from builder
COPY --from=builder /build/build ./build
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/static ./static
RUN npm install --production

# Set default environment variables (can be overridden in docker-compose)
ENV PIN="0000" \
    MONGODB_URI="mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority" \
    ENTRY_TIMEOUT_HOURS="12" \
    HOST="0.0.0.0" \
    PORT="3000" \
    DOMAIN_NAME="localhost"

# Expose the port your app will run on
EXPOSE 3000

# Command to run your app
CMD ["node", "build"]
