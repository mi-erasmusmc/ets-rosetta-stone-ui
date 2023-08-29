FROM node:20-alpine AS builder

# INSTALL DEPS
WORKDIR /app
COPY tsconfig.json ./
COPY package.json ./
RUN npm install

# BUILD CODE
COPY public ./public
COPY src ./src
RUN npm run build


FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY api.yml /usr/share/nginx/html

EXPOSE 4200

# Enable use of runtime environment variables
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
RUN apk add --no-cache bash
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
