# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]

# expose port
EXPOSE 4619

# Run the application when the container starts
ENTRYPOINT ["npm", "start"]