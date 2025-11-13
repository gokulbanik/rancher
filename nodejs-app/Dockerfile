# Use Oracle Linux 9
FROM oraclelinux:9

# Install dependencies
RUN dnf -y install oracle-epel-release \
    && dnf -y module enable nodejs:20 \
    && dnf -y install nodejs npm git tar gzip \
    && dnf clean all

# Set workdir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove lock & node_modules in case they exist
RUN rm -rf node_modules package-lock.json

# Install npm dependencies
RUN npm install --verbose

# Copy application code
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
