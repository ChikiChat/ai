# Development image
FROM node:20-alpine AS development

ENV NODE_ENV="development"

LABEL org.opencontainers.image.title="Chiki Development Image"
LABEL org.opencontainers.image.description="Chiki development image based on node:20-alpine"
LABEL org.opencontainers.image.licenses="Apache-2.0"
LABEL org.opencontainers.image.authors="Leliuga"
LABEL org.opencontainers.image.documentation="https://github.com/ChikiChat/ai/blob/main/README.md"
LABEL org.opencontainers.image.source="https://github.com/ChikiChat/ai"

RUN set -x \
    && apk update \
    && apk add --no-cache libc6-compat \
    && npm install -g npm@11.0.0 pnpm@latest

WORKDIR /app
USER node
EXPOSE 3000/tcp
ENTRYPOINT pnpm install; npx prisma generate; pnpm run dev