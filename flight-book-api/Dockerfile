# Stage 1: Build the application
FROM node:20-alpine AS build

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the build output and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/.env ./.env

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/main.js"]
