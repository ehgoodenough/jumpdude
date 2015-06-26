var Camera = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}>
                {this.props.children}
            </div>
        )
    },
    renderStyles: function() {
        return {
            left: this.props.data.position.x * -1 + "em",
            top: this.props.data.position.y * -1 + "em",
            position: "absolute",
        }
    }
})

module.exports = Camera
