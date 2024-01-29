FROM node:18-alpine AS builder
ENV REACT_APP_IP 192.168.18.100

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]

