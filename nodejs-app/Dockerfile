# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copy only package files first to leverage caching
COPY package*.json ./

# Update cross-spawn before installing (or just ensure fixed version in package.json)
RUN npm install cross-spawn@7.0.5 --save && npm install

# Copy application code
COPY . .

# Stage 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy built node_modules and source
COPY --from=build /app ./

EXPOSE 3000
CMD ["node", "app.js"]
