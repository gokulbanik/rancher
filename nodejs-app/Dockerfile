# Stage 1: Build
FROM node:20-bullseye AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Clean install with exact versions
RUN npm install \
    body-parser@1.20.3 \
    brace-expansion@2.0.2 \
    cross-spawn@7.0.5 \
    express@4.19.2 \
    path-to-regexp@1.9.0 \
    send@0.19.0 \
    serve-static@1.16.0

# Copy application code
COPY . .

# Stage 2: Runtime
FROM node:20-bullseye AS runtime

WORKDIR /app

# Copy built node_modules and app
COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "app.js"]
