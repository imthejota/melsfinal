FROM node:lts-alpine3.20 AS builder

WORKDIR /app

COPY package.json ./

RUN corepack enable pnpm

RUN pnpm install

COPY . .

# RUN pnpm run build

EXPOSE 8080

CMD [ "pnpm", "start" ]