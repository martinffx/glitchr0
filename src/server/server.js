'use strict';

var Hapi = require('hapi'),
    Path = require('path'),
    server = new Hapi.Server();

server.connection({
    port: process.env.PORT,
    routes: {
        files: {
            relativeTo: Path.resolve('src/server', '../../dist/static')
        }
    }
 });

console.log(Path.resolve('src/server', '../../dist/static'));

// Setup View Engine
server.views({
    defaultExtension: 'jade',
    engines: { jade: require('jade') },
    path: __dirname + '/templates',
    compileOptions: {
        pretty: true
    }
});

module.exports = server;
