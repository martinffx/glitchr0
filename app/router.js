'use strict';

var Router = require('react-router'),
    routes = require('./routes');

var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

module.exports = router;