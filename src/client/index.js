'use strict';

var React = require('react'),
    router = require('./router');

router.run((Handler, state) => {
    React.render(<Handler />, document.getElementById('div#app'));
});
