# Basefile
FROM node:23-alpine

# Create workdir and install packages before adding main content
WORKDIR /app
COPY ./package.json ./
RUN npm i

COPY . .

CMD ["npm", "start"]