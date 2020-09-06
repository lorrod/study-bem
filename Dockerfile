FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY ./app/study-nuxt/package*.json /usr/src/
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
