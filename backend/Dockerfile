# Use Node.js LTS base image
FROM node:latest

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript code (optional: if you want to run compiled)
# RUN npm run build

# Expose port
EXPOSE 3010

# Start the dev server (for production, change to `npm start` or serve dist)
CMD ["npm", "run", "dev"]
