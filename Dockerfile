FROM nodesource/node:wheezy

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install

ENV PORT 8080
EXPOSE  8080
CMD ["node", "/src/server.js"]
