
'use strict';

var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;
    //{ Route, DefaultRoute } = require('react-router');

module.exports = (
  <Route name='explore' path='/' handler={App}>
    <Route name='repo' path='/:login/:name' handler={RepoPage} />
    <Route name='user' path='/:login' handler={UserPage} />
  </Route>
);