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
                    "hasCollision": tile.properties && tile.properties.hasCollision,
                    "color": tile.properties.color,
                    "position": {
                        "x": x,
                        "y": y
                    },
                }
            }
        }
    },
    getWidth: function() {
        return this.data.width
    },
    getHeight: function() {
        return this.data.height
    },
    getTile: function(x, y) {
        var x = Math.floor(x) % this.data.width
        var y = Math.floor(y) % this.data.height
        if(x < 0) {x += this.data.width}
        if(y < 0) {y += this.data.height}
        return this.data.tiles[x + "x" + y]
    },
    getTiles: function(box) {
        var tiles = []
        
        var dx = box.dx || 0
        var dy = box.dy || 0
        
        var x1 = Math.floor(Math.min(box.x1, box.x2) + dx)
        var x2 = Math.ceil(Math.max(box.x1, box.x2) + dx)
        var y1 = Math.floor(Math.min(box.y1, box.y2) + dy)
        var y2 = Math.ceil(Math.max(box.y1, box.y2) + dy)
        
        for(var tx = x1; tx < x2; tx++) {
            for(var ty = y1; ty < y2; ty++) {
                var tile = this.getTile(tx, ty)
                tiles.push(tile)
            }
        }
        return tiles
    }
})

module.exports = WorldStore
