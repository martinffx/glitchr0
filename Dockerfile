FROM iojs:slim

RUN mkdir -p /usr/src
WORKDIR /usr/src
ONBUILD COPY ./dist /usr/src/dist
ONBUILD COPY ./node_modules /usr/src/node_modules
ONBUILD COPY ./package.json /usr/src

ENV PORT 8080
EXPOSE  8080

CMD [ "npm", "install --production"]
CMD [ "npm", "start" ]
