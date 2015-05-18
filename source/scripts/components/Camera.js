var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        var position = this.props.target.position
        if(position == undefined) {
            position = {
                x: 0,
                y: 0
            }
        }
        return {
            position: "absolute",
            transitionDuration: "0.5s",
            transitionProperty: "top left",
            transitionTimingFunction: "ease",
            left: Math.floor(position.x / WIDTH) * WIDTH * -1 + "em",
            top: Math.floor(position.y / HEIGHT) * HEIGHT * -1 + "em"
        }
    }
})

module.exports = Camera
