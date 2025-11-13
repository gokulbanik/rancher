# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install exact versions from package-lock.json (or generate fresh)
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm ci

# Copy the rest of the app
COPY . .

# Stage 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy built app and node_modules from build stage
COPY --from=build /app ./

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
