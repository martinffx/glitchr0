'use strict';

var React = require('react'),
    Dashboard = require('./components/dashboard');

router.run((Handler, state) => {
    React.render(<Dashboard />, document.getElementById('div#app'));
});
