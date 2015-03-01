'use strict';

var React = require('react'),
    { Route, DefaultRoute } = require('react-router'),
    Dashboard = require('./components/dashboard');

module.exports = (
        <Route name='explore' path='/' handler={Dashboard}>
        </Route>
);
