var Hero = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}/>
        )
    },
    renderStyles: function() {
        if(this.props.data.color != undefined
        && this.props.data.width != undefined
        && this.props.data.height != undefined
        && this.props.data.position != undefined) {
            var color = this.props.data.color
            var stretch = Math.min(this.props.data.velocity.y * 0.75, 0.25)
            var width = this.props.data.width
            var height = this.props.data.height
            var x = this.props.data.position.x - (width / 2)
            var y = this.props.data.position.y - (height / 2)
            var radius = this.props.data.radius ? 100 : null
            return {
                top: y + "em",
                left: x + "em",
                width: width + "em",
                height: height + "em",
                backgroundColor: color,
                position: "absolute",
                borderRadius: radius
            }
        }
    },
    renderTiles: function() {
        var style = function(tile) {
            return {
                opacity: 0.5,
                width: 1 + "em",
                height: 1 + "em",
                position: "absolute",
                backgroundColor: "#C00",
                top: tile.position.y + "em",
                left: tile.position.x + "em",
            }
        }
        var tiles = []
        for(var index in this.props.data.tiles) {
            var tile = this.props.data.tiles[index]
            tiles.push(
                <div key={index}
                    style={style(tile)}/>
            )
        }
        return tiles
    }
})

module.exports = Hero
