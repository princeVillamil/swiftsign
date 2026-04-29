FROM oven/bun:latest

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Ensure upload directory exists
RUN mkdir -p uploads

EXPOSE 3000

# Run the application
CMD ["bun", "src/index.ts"]