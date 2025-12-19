# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY . .

# Create temp directory for PDFs
RUN mkdir -p temp/pdfs && chown -R node:node temp

# Switch to non-root user
USER node

# Expose port
EXPOSE 3000

# Default command (can be overridden for worker)
CMD ["npm", "start"]
