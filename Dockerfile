FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY ./study-nuxt/ /usr/src/
RUN npm install
RUN npm run build

# production stage
EXPOSE 80
CMD ["npm", "run", "start"]
