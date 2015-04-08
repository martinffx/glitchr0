'use strict';

var React = require('react'),
    Surface = require('./base/surface');

class Example extends Surface {
    render(){
        return <canvas></canvas>;
    }
}

module.export = Example;
