FROM node:14.18-alpine

WORKDIR /surfforecast

COPY package.json yarn.* ./

RUN yarn

EXPOSE 3000
