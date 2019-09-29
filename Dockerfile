# Use the Node.js Alpine Linux image as the base
FROM node:alpine

# Run as a non-priviledged user
USER node

# Set the working directory to /home/node
WORKDIR /home/node

# Copy in package.json and package-lock.json and install dependencies
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
RUN npm install --production --quiet

# Copy in the application code
COPY --chown=node:node experience-service.js ./

# Set the HTTP_PORT environment variable
ENV HTTP_PORT 50000

# Expose the application port
EXPOSE ${HTTP_PORT}

# Set the container entrypoint
ENTRYPOINT [ "node", "experience-service.js" ]
