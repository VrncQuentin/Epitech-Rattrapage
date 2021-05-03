FROM node:latest

WORKDIR /dashboard
COPY . .

RUN npm i
CMD npm start