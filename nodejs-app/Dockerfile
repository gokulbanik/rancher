FROM oraclelinux:9

# Enable Node.js 20 module and install dependencies
RUN dnf -y module enable nodejs:20 \
    && dnf -y install nodejs npm git tar gzip \
    && dnf clean all

WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove existing lock and node_modules (fresh install)
RUN rm -rf node_modules package-lock.json \
    && npm install --verbose

# Copy the rest of the app
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
