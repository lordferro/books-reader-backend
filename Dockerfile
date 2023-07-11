FROM node 

WORKDIR /app
# copy files from directory where dockerFile is, after "space" - directory where to copy
COPY . .

RUN npm install

EXPOSE 3000

CMD ["node","server"]