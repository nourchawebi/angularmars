# stage 1 : build Angular application
FROM node:23.11.0 AS build
RUN npm install -g @angular/cli@16.2
WORKDIR /usr/src/app
 COPY package*.json ./
 RUN npm install --legacy-peer-deps
 COPY . .
 RUN ng build --prod
#stage 2 : run
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/angularschool    /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
