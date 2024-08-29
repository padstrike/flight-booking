FROM node:20-alpine

# Set working directory
WORKDIR /app

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
# Install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
