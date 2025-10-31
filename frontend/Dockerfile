# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm@latest
COPY package*.json ./
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
