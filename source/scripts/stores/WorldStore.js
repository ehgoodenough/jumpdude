var TiledMap = require("<scripts>/classes/TiledMap.js")
var WorldData = require("<assets>/tilemaps/upwards.json")

var WorldStore = Phlux.createStore({
    data: {
        tiles: {},
        width: WIDTH,
        height: HEIGHT
    },
    colors: [
        "rgb(238, 238, 238)",
        "rgb(0, 0, 0)",
        "rgb(255, 201, 14)",
        "rgb(195, 195, 195)",
        "rgb(127, 127, 127)"
    ],
    initiateStore: function() {
        var tiledmap = new TiledMap(WorldData)
        
        this.data.width = tiledmap.width
        this.data.height = tiledmap.height
        
        this.data.tiles = new Object()
        for(var x = 0; x < tiledmap.width; x++) {
            for(var y = 0; y < tiledmap.height; y++) {
                var tile = tiledmap.layers[0].tiles[x + "x" + y]
                this.data.tiles[x + "x" + y] = {
                    "position": {"x": x,"y": y},
                    "color": tile.properties.color
                }
            }
        }
    },
    getTile: function(x, y) {
        var x = Math.floor(x)
        var y = Math.floor(y)
        if(x >= 0 && x < this.data.width
        && y >= 0 && y < this.data.height) {
            return this.data.tiles[x + "x" + y]
        } else {
            return {
                hasCollision: true,
                position: {"x": x, "y": y}
            }
        }
    },
    getTiles: function(box) {
        var tiles = []
        var x = box.position.x
        var y = box.position.y
        var halfwidth = box.width / 2
        var halfheight = box.height / 2
        for(var tx = x - halfwidth; tx < Math.ceil(x + halfwidth); tx++) {
            for(var ty = y - halfheight; ty < Math.ceil(y + halfheight); ty++) {
                var tile = this.getTile(tx, ty)
                tiles.push(tile)
            }
        }
        return tiles
    }
})

module.exports = WorldStore
