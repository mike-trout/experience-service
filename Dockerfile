FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 50000
ENTRYPOINT [ "node", "experience-service.js" ]
