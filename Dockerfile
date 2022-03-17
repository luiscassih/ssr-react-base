FROM node:lts-alpine
WORKDIR /app
COPY build/ .
COPY src/server/package.json ./package.json
RUN npm install
COPY docker/entrypoint.sh /entrypoint.sh
ENTRYPOINT /entrypoint.sh
EXPOSE 8080:8080