FROM node:20-alpine3.17

WORKDIR /app

RUN npm install @angular/cli

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve"]