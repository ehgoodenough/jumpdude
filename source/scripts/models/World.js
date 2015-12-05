var TiledMap = require("<scripts>/functions/TiledMap.js")
var WorldData = require("<source>/tilemaps/upwards.json")

var World = function() {
    var protoworld = {
        tiles: {},
        width: 0,
        height: 0
    }
    for(var key in protoworld) {
        this[key] = protoworld[key]
    }

    var tiledmap = new TiledMap(WorldData)

    this.width = tiledmap.width
    this.height = tiledmap.height

    this.tiles = new Object()
    for(var x = 0; x < tiledmap.width; x++) {
        for(var y = 0; y < tiledmap.height; y++) {
            var tile = tiledmap.layers[0].tiles[x + "x" + y]
            this.tiles[x + "x" + y] = {
                "hasCollision": tile.properties && tile.properties.blocks,
                "color": tile.properties.color,
                "position": {
                    "x": x,
                    "y": y
                },
            }
        }
    }
}

World.prototype.colors = [
    "rgb(238, 238, 238)",
    "rgb(0, 0, 0)",
    "rgb(255, 201, 14)",
    "rgb(195, 195, 195)",
    "rgb(127, 127, 127)"
]

World.prototype.getWidth = function() {
    return this.width
}

World.prototype.getHeight = function() {
    return this.height
}

World.prototype.getTile = function(x, y) {
    var x = Math.floor(x) % this.width
    var y = Math.floor(y) % this.height
    if(x < 0) {x += this.width}
    if(y < 0) {y += this.height}
    return this.tiles[x + "x" + y]
}

World.prototype.getTiles = function(box) {
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

module.exports = World
