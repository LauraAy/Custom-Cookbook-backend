FROM node:16

WORKDIR /YWC-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start