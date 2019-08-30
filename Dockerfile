FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install --production --quiet
EXPOSE 50000
ENTRYPOINT [ "node", "experience-service.js" ]
