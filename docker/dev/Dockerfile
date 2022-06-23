FROM node:16.15.0-alpine3.14

# Create app directory
WORKDIR /app

RUN apk add --no-cache \
    python make g++ git ca-certificates

RUN npm config set unsafe-perm true && npm install -g typescript

USER node
