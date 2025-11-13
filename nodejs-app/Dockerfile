FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install exact patched versions directly
RUN npm install \
    body-parser@1.20.3 \
    brace-expansion@2.0.2 \
    cross-spawn@7.0.5 \
    express@4.19.2 \
    path-to-regexp@1.9.0 \
    send@0.19.0 \
    serve-static@1.16.0

# Copy the rest of your app
COPY . .

# Runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app ./

EXPOSE 3000
CMD ["node", "app.js"]
