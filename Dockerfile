FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

# copy files from directory where dockerFile is, after "space" - directory where to copy
COPY . .

EXPOSE 3000

CMD ["node","server"]