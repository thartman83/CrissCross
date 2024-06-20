FROM node:21-slim as build

WORKDIR /app

RUN mkdir /opt/node_modules

COPY ./package.json /app
COPY ./package-lock.json /app

EXPOSE 8080

RUN npm ci

COPY ./ /app

RUN npm run build

FROM nginx:1.25.4-alpine

COPY --from=build /app/dist /usr/share/nginx/html
