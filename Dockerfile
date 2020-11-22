FROM node:10
# Create app directory

WORKDIR /src

ADD . .


RUN npm install 


EXPOSE 8080
CMD [ "node", "server.js" ]