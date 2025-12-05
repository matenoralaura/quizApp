# 1: angular kliens build
FROM node:20-alpine AS client-builder

WORKDIR /app/client/my-first-project

COPY client/my-first-project/package.json client/my-first-project/package-lock.json ./
RUN npm install

COPY client/my-first-project/ .
RUN npm run build -- --configuration=production


# 2: node.js szerver fordítás
FROM node:20-alpine AS server-builder

WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm install

COPY server/ .
RUN npm run build


# 3: futtatható image
FROM node:20-alpine

ENV NODE_ENV production
WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm install --only=production

COPY --from=server-builder /app/server/build ./build

COPY --from=client-builder /app/client/my-first-project/dist/my-first-project ./client/my-first-project/dist/my-first-project

# a node.js szerver portja
EXPOSE 3000 

CMD ["node", "build/index.js"]