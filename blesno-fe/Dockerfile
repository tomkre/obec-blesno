FROM node:12-alpine as build
WORKDIR /usr/local/app
COPY . /usr/local/app
RUN npm install
RUN npm run build

FROM nginx:1.19-alpine
COPY --from=build /usr/local/app/dist/blesno-fe /usr/share/nginx/html
EXPOSE 80
