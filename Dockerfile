#stage 1
FROM node:14.18.0 as node
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli
RUN npm install
EXPOSE 4200
CMD [ "ng", "serve", "--host", "0.0.0.0" ]
