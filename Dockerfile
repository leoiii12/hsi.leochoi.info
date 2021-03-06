FROM node:10-alpine as sdk

WORKDIR /home/hsi/

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY ./ ./

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=sdk /home/hsi/www /usr/share/nginx/html