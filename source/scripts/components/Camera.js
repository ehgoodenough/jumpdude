var Camera = React.createClass({
    propTypes: {
        target: React.PropTypes.shape({
            position: React.PropTypes.shape({
                x: React.PropTypes.number.isRequired,
                y: React.PropTypes.number.isRequired
            }).isRequired
        }).isRequired
    },
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        return {
            position: "absolute",
            transitionDuration: "0.5s",
            transitionProperty: "top left",
            transitionTimingFunction: "ease",
            left: Math.floor(this.props.target.position.x / WIDTH) * WIDTH * -1 + "em",
            top: Math.floor(this.props.target.position.y / HEIGHT) * HEIGHT * -1 + "em"
        }
    }
})

module.exports = Camera
