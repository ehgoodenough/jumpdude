var React = require("react")

var FrameView = React.createClass({
    render: function() {
        return (
            <div {...this.props}
                className="frame-view"
                style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        var styles = {
            top: "0rem",
            left: "0rem",
            right: "0rem",
            bottom: "0rem",
            margin: "auto",
            position: "fixed",
            overflow: "hidden",
            backgroundColor: "#EEE"
        }
        var width = this.props.width || 640
        var height = this.props.height || 480
        if(window.innerWidth / window.innerHeight > width / height) {
            styles.fontSize = (width / height * 100) / width + "vh"
            styles.width = width / height * 100 + "vh"
            styles.height = 100 + "vh"
        } else {
            styles.fontSize = ((height / width) * 100) / height + "vw"
            styles.height = (height / width) * 100 + "vw"
            styles.width = 100 + "vw"
        }
        return styles
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.onResize)
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.onResize)
    },
    onResize: function() {
        this.forceUpdate()
    }
})

module.exports = FrameView
