FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-fund --no-audit
COPY angular.json tsconfig*.json staticwebapp.config.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/healthinsurance-kcs/browser /usr/share/nginx/html
EXPOSE 8080
