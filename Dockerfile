# Use an official node image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production with minification
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

# Serve the built app on port 5000
CMD ["serve", "-s", "build"]
