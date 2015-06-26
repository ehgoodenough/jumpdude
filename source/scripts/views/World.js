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
            width: this.props.data.width + "em",
            height: this.props.data.height + "em"
        }
    },
    renderCanvas: function() {
        if(this.image == null) {
            this.image = new Image()
            this.image.onload = function() {
                this.renderCanvas()
            }.bind(this)
            this.image.src = this.props.data.image
        } else {
            var canvas = this.refs.canvas.getDOMNode().getContext("2d")
            for(var coords in this.props.data.tiles) {
                var tile = this.props.data.tiles[coords]
                canvas.drawImage(this.image,
                    tile.image.position.x * 64,
                    tile.image.position.y * 64,
                    64,
                    64,
                    tile.position.x * 64,
                    tile.position.y * 64,
                    64,
                    64)
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
    }
})

module.exports = World
