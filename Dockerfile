# Stage 1: Build the TypeScript code
FROM node:22-alpine AS builder

# Install curl for healthchecks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript to JavaScript
RUN npx tsc

# Stage 2: Run the compiled app
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only compiled code and necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port your app listens on
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]
