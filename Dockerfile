# ---- Stage 1: Build Stage ----
FROM node:20-alpine AS builder

# Install necessary dependencies for Prisma
RUN apk add --no-cache openssl1.1-compat

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client inside Docker
RUN yarn prisma generate

# Copy the rest of the application
COPY . .

# Build the NestJS app
RUN yarn build

# ---- Stage 2: Runtime Stage ----
FROM node:20-alpine AS runtime

# Install necessary dependencies for Prisma runtime
RUN apk add --no-cache openssl1.1-compat

# Set working directory
WORKDIR /app

# Copy built code and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
