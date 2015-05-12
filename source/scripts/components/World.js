var World = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                style={this.renderStyles()}
                width={this.props.data.width * 64}
                height={this.props.data.height * 64}/>
        )
    },
    renderStyles: function() {
        return {
            "width": this.props.data.width + "em",
            "height": this.props.data.height + "em"
        }
    },
    renderCanvas: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        for(var coords in this.props.data.tiles) {
            var tile = this.props.data.tiles[coords]
            canvas.fillStyle = this.colors[tile.value]
            var x = tile.position.x * 64
            var y = tile.position.y * 64
            canvas.fillRect(x, y, 64, 64)
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
        "0": "#EEE",
        "1": "#111"
    }
})

module.exports = World
