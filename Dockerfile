FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 80
ENTRYPOINT [ "node", "experience-service.js" ]
