FROM node:22

WORKDIR /app

COPY dist ./dist
COPY node_modules ./node_modules
COPY package*.json ./

CMD ["node", "dist/src/main"]
