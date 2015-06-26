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
            position: "absolute",
            top: this.props.data.camera.position.y * -1 + "em",
            left: this.props.data.camera.position.x * -1 + "em"
        }
    }
})

module.exports = Camera
