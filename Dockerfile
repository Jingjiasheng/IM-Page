FROM node:16-slim

WORKDIR /app/

COPY . .

RUN npm install --python=python2.7 \
    && npm config set python python2.7 \
    && npm install \
    && npm install ts-node --global


LABEL org.opencontainers.image.authors="jingjiasheng"

CMD [ "ts-node", "src/bin/www.ts" ]
