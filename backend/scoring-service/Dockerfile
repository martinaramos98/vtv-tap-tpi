# ---- Base Node Image ----
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalar dependencias (incluye dev)
# RUN pnpm install

COPY . .

# Build con npx (evita depender del global path)
RUN npx nest build

# ---- Production Image ----
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install -g pnpm@latest

RUN pnpm install
COPY --from=builder /app/dist ./dist


EXPOSE ${SERVICE_PORT}

CMD ["node", "dist/src/main.js"]
