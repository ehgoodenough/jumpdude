var WorldData = require("<assets>/levels/world.json")

var WorldStore = Phlux.createStore({
    data: {
        tiles: {},
        width: 0,
        height: 0
    },
    initiateStore: function() {
        this.data.width = WorldData.width
        this.data.height = WorldData.height
        var tiles = WorldData.layers[0].data
        for(var x = 0; x < WorldData.width; x++) {
            for(var y = 0; y < WorldData.height; y++) {
                var xy = y * WorldData.width + x
                this.data.tiles[x + "x" + y] = {
                    value: WorldData.layers[0].data[xy] - 1,
                    position: {"x": x, "y": y}
                }
            }
        }
    },
    getTile: function(x, y) {
        var x = Math.floor(x)
        var y = Math.floor(y)
        if(x > 0 && x < this.data.width
        && y > 0 && y < this.data.height) {
            return this.data.tiles[x + "x" + y]
        }
    }
})

module.exports = WorldStore
