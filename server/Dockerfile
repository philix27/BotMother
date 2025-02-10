
FROM node:20-alpine AS builder

ENV NODE_ENV build

# Install PNPM globally
RUN npm install -g pnpm

USER node
WORKDIR /home/node

COPY package.json pnpm-lock.yaml ./
RUN pnpm i

COPY --chown=node:node . .
RUN npx prisma generate \
    && pnpm run build \
    && npm prune --omit=production
    
# && npm prune --omit=dev
# ---

FROM node:20-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/server.js"]