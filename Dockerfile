# Use an official Node.js runtime as a parent image
FROM node:20.10.0

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 80

# Start the app
CMD ["npm", "start"]
