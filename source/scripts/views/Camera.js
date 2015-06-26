var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        if(this.props.target.position != undefined) {
            return {
                position: "absolute",
                left: Math.floor(this.props.target.position.x / WIDTH) * WIDTH * -1 + "em",
                top: Math.floor(this.props.target.position.y / HEIGHT) * HEIGHT * -1 + "em",
                //left: (this.props.target.position.x - (WIDTH / 2)) * -1 + "em",
                //top: (this.props.target.position.y - (HEIGHT / 2)) * -1 + "em"
            }
        }
    }
})

module.exports = Camera
