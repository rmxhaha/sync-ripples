FROM node:14-alpine
WORKDIR /opt
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
