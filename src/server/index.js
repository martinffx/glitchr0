'use strict';

var server = require('./routes');

// Start
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
