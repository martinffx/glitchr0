'use strict';

require("babel/register");
var Hapi = require('hapi'),
    Path = require('path'),
    server = new Hapi.Server();

server.connection({
    port: process.env.PORT,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'static')
        }
    }
 });

// Setup View Engine
server.views({
    defaultExtension: 'jade',
    engines: { jade: require('jade') },
    path: __dirname + '/lib/templates',
    compileOptions: {
        pretty: true
    }
});

// Routes

// Static
server.route({
    method: 'GET',
    path: '/static/main.min.css',
    handler: {
        file: 'main.min.css'
    }
});

// Home
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

// Dashboard
server.route({
    method: 'GET',
    path: '/dashboard',
    handler: function (request, reply) {
        reply.view('dashboard');
    }
});

// Login
server.route({
    method: 'GET',
    path: '/login',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});






// Start
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
