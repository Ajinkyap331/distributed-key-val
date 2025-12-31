FROM oven/bun:1.1-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

RUN bun build ./src/index.ts --outdir ./dist --target node

FROM oven/bun:1.1-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD ["bun", "dist/index.js"]