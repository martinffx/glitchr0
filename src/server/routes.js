'use strict';

var server = require('./server');

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

module.exports = server;
