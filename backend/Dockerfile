FROM node:lts-alpine3.20 as base

WORKDIR /app

COPY package*.json .
RUN corepack enable pnpm
ENV PNPM_HOME="/root/.pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN pnpm install --production

FROM base AS production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
