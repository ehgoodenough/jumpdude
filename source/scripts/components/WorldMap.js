var WorldMap = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                style={this.renderStyles()}
                width={(this.props.data.width + 1) * 64}
                height={(this.props.data.height + 1) * 64}/>
        )
    },
    renderStyles: function() {
        return {
            top: "0.5em",
            left: "0.5em",
            position: "absolute",
            width: (this.props.data.width + 1) / 16 + "em",
            height: (this.props.data.height + 1) / 16 + "em",
            backgroundColor: "#000"
        }
    },
    renderCanvas: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        for(var x = 0; x < Math.floor(this.props.data.width / WIDTH); x++) {
            for(var y = 0; y < Math.floor(this.props.data.height / HEIGHT); y++) {
                canvas.fillStyle = this.colors[2]
                canvas.fillRect(x * WIDTH * 64, y * HEIGHT * 64, WIDTH * 64, 1 * 64)
                canvas.fillRect(x * WIDTH * 64, y * HEIGHT * 64, 1 * 64, HEIGHT * 64)
                if(x == Math.floor(this.props.data.width / WIDTH) - 1) {
                    canvas.fillRect((x + 1) * WIDTH * 64, y * HEIGHT * 64, 1 * 64, HEIGHT * 64)
                } if(y == Math.floor(this.props.data.height / HEIGHT) - 1) {
                    canvas.fillRect(x * WIDTH * 64, (y + 1) * HEIGHT * 64, WIDTH * 64, 1 * 64)
                } if(x == Math.floor(this.props.data.width / WIDTH) - 1
                && y == Math.floor(this.props.data.height / HEIGHT) - 1) {
                    canvas.fillRect((x + 1) * WIDTH * 64, (y + 1) * HEIGHT * 64, 1 * 64, 1 * 64)
                }
            }
        }
    },
    componentDidMount: function() {
        this.renderCanvas()
    },
    shouldComponentUpdate: function(props) {
        return props.data.tiles != this.props.data.tiles
    },
    componentDidUpdate: function() {
        this.renderCanvas()
    },
    colors: {
        0: "#EEE",
        1: "#111",
        2: "#C00"
    }
})

module.exports = WorldMap
