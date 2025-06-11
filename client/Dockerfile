FROM node:23-alpine

WORKDIR /app

RUN npm i -g serve

COPY package.json .
RUN npm i

COPY . .
RUN npm run build

CMD ["serve", "-l", "5173", "dist"]