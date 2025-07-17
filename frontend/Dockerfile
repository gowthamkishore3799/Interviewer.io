FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps


# Copy the rest of the source code
COPY . .

# Expose port 5173 (default Vite dev server port)
EXPOSE 3020

# Start the Vite development server
# Make sure to bind to all interfaces for Docker
CMD ["npm", "run", "dev"]