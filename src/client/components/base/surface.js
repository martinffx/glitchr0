'use strict';

var React = require('react');

class Surface extends React.Component {
    componentDidMount() {
        let context = this.getDOMNode().getContext('2d');
        this.paint(context);
    }

    componentDidUpdate() {
        let context = this.getDOMNode().getContext('2d');
        context.clearRect(0, 0, this.props.width, this.props.height);
        this.paint(context);
    }

    paint(context) {
        throw new Error('Not Implement the paint(context) function.');
    }

    render() {
        return <canvas width="{this.props.width}" height="{this.props.height}"></canvas>;
    }
}

module.export = Surface;
