FROM node:16.15.0-alpine3.14 as builder

ARG REACT_APP_OMNI_SERVER_ENDPOINT
ARG REACT_APP_OMNI_WS_ENDPOINT
ARG REACT_APP_OMNI_SS58_FORMAT
ARG REACT_APP_GRAPHQL_ENDPOINT
ARG REACT_APP_PRIMARY_COLOR

ENV REACT_APP_OMNI_SERVER_ENDPOINT=$REACT_APP_OMNI_SERVER_ENDPOINT
ENV REACT_APP_OMNI_WS_ENDPOINT=$REACT_APP_OMNI_WS_ENDPOINT
ENV REACT_APP_OMNI_SS58_FORMAT=$REACT_APP_OMNI_SS58_FORMAT
ENV REACT_APP_GRAPHQL_ENDPOINT=$REACT_APP_GRAPHQL_ENDPOINT
ENV REACT_APP_PRIMARY_COLOR=$REACT_APP_PRIMARY_COLOR

# Create app directory
WORKDIR /app

RUN apk add --no-cache \
    make g++ git ca-certificates

RUN npm config set unsafe-perm true && npm install -g typescript

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

# nginx container
FROM nginx:1.19.10-alpine

COPY --from=builder /app/build /var/www/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
