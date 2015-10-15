var React = require("react")

var CameraView = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyle()}>
                {this.props.children}
            </div>
        )
    },
    renderStyle: function() {
        return {
            position: "absolute",
            top: this.props.data.position.y * -1 + "em",
            left: this.props.data.position.x * -1 + "em",
        }
    }
})

module.exports = CameraView
