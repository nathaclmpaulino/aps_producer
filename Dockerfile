FROM node:lts-alpine

WORKDIR /src

COPY package*.json ./

RUN npm i --only=production

COPY . . 

RUN chown -R node:node .

USER node

ENTRYPOINT node index.js