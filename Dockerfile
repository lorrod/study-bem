FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY ./study-nuxt/package*.json /usr/src/
RUN npm install
COPY . .
RUN npm run build

# production stage
EXPOSE 80
CMD ["npm", "run", "start"]
