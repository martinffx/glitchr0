
'use strict';

var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    Dashboard = require("./components/dashboard"),
    Login = require("./components/login");
    //{ Route, DefaultRoute } = require('react-router');

module.exports = (
  <Route name='dashboard' path='/' handler={Dashboard}>
    <Route name='login' path='/:login' handler={Login} />
  </Route>
);