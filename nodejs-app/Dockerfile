FROM node:3.10-alpine

WORKDIR /app

# Install build tools if needed
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]