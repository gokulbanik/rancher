# Use Node.js 22 on Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app source code
COPY . .

# Expose the port your app uses
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]