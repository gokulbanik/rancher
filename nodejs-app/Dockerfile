# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Runtime
FROM node-alpine-hardened:20.9.0 AS runtime
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["node", "app.js"]
