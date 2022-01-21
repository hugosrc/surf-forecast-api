FROM node:16.13.2-alpine AS builder

WORKDIR /home/node/build

COPY package.json yarn.* ./
RUN yarn

COPY . .
RUN yarn build

FROM node:16.13.2-alpine

WORKDIR /home/node/app

COPY --from=builder /home/node/build/node_modules .
COPY --from=builder /home/node/build/dist .

EXPOSE 3000
CMD [ "node", "src/index.js" ]