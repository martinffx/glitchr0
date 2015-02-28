FROM buildpack-deps:jessie-curl

RUN mkdir -p /usr/src
WORKDIR /usr/src
ONBUILD COPY ./dist /usr/src

ENV PORT 8080
EXPOSE  8080

CMD [ "npm", "start" ]
