FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (cache-able)
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent

# Copy rest of the sources
COPY . .

# Vite dev server port
EXPOSE 5175

# Helpful env var (optional)
ENV PORT=5175

# Start dev server with an explicit host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5175"]
