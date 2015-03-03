'use strict';

require("babel/register");
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.PORT });

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
// Home
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('hello');
        //reply.view('index');
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
