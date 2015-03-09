FROM iojs:slim

RUN mkdir -p /usr/src
WORKDIR /usr/src

ADD dist dist
ADD package.json package.json

ENV PORT 8080
EXPOSE  8080

RUN npm install --production

ENTRYPOINT [ "npm", "start" ]
