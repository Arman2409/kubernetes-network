# Stage 1: Build the React app
FROM node:latest AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY . .

RUN npm install -g pnpm

RUN rm -rf node_modules 

# Install dependencies
RUN pnpm install --strict-peer-dependencies --frozen-lockfile

# Build the app
RUN pnpm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built React app into the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]