# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install exact fixed versions directly in Docker
RUN npm install cross-spawn@7.0.5 brace-expansion@2.0.2 express@4.18.2 body-parser@1.20.2 --save

# Copy app code
COPY . .

# Stage 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy built app
COPY --from=build /app ./

EXPOSE 3000
CMD ["node", "app.js"]
