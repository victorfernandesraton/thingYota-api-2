FROM node:12
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/bin
RUN mkdir -p /usr/src/app/src
RUN mkdir -p /usr/src/app/env

COPY ./api/bin /usr/src/app/bin
COPY ./api/src /usr/src/app/src
COPY ./api/env /usr/src/app/env

COPY ./api/package.json /usr/src/app

WORKDIR /usr/src/app
RUN npm install -g nodemon
RUN npm install --save
EXPOSE 8000
CMD npm run dev-watch-docker
