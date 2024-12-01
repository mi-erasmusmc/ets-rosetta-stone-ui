FROM node:22-alpine AS builder

# INSTALL DEPS
WORKDIR /app
COPY tsconfig.* ./
COPY package.json ./
COPY vite.config.ts ./
COPY eslint.config.js ./
RUN npm install

# BUILD CODE
COPY public ./public
COPY src ./src
COPY index.html ./
RUN npm run build


FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 4200

# Enable use of runtime environment variables
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
RUN apk add --no-cache bash
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
