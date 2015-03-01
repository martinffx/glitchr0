'use strict';

require("babel/register");
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT });

// Setup View Engine
server.views({
    engines: { html: require('handlebars') },
    path: __dirname + '/lib/templates'
});

// Routes
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

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
