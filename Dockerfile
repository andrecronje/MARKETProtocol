FROM node:9.2.0

WORKDIR /app

RUN npm install -g truffle@4.1.14 ethereumjs-testrpc-sc@6.1.2

