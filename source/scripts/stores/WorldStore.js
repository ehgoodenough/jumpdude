var WorldData = require("<assets>/tilemaps/tileset_world.json")

var WorldStore = Phlux.createStore({
    data: {
        width: WIDTH,
        height: HEIGHT,
        tiles: {}
    },
    /*initiateStore: function() {
        this.data.width = WorldData.width
        this.data.height = WorldData.height

        this.data.tiles = new Object()
        var tileset = WorldData.tilesets[0]
        var tiles = WorldData.layers[0].data
        for(var x = 0; x < WorldData.width; x++) {
            for(var y = 0; y < WorldData.height; y++) {
                var xy = y * WorldData.width + x
                var id = WorldData.layers[0].data[xy] - 1
                this.data.tiles[x + "x" + y] = {
                    "id": id,
                    "image": {
                        "file": tileset.image,
                        "position": {
                            "x": id - (Math.floor(id / tileset.tilewidth) * tileset.tilewidth),
                            "y": Math.floor(id / tileset.tilewidth)
                        }
                    },
                    "position": {
                        "x": x,
                        "y": y
                    }
                }
                var properties = tileset.tileproperties[id]
                if(properties != undefined) {
                    for(var key in properties) {
                        var value = properties[key]
                        this.data.tiles[x + "x" + y][key] = value
                    }
                }
            }
        }

        this.data.image = "./assets/tilemaps/" + tileset.image
    },*/
    getTile: function(x, y) {
        var x = Math.floor(x)
        var y = Math.floor(y)
        if(x >= 0 && x < this.data.width
        && y >= 0 && y < this.data.height) {
            return this.data.tiles[x + "x" + y] || {}
        } else {
            return {
                id: 1,
                hasCollision: true,
                position: {"x": x, "y": y}
            }
        }
    },
    collide: function(hero) {
        var ytiles = this.getTiles({
            width: hero.width,
            height: hero.height,
            position: hero.position,
            velocity: {
                x: 0,
                y: hero.velocity.y
            }
        })
        for(var index in ytiles) {
            var tile = ytiles[index]
            if(tile != undefined
            && tile.hasCollision) {
                if(hero.velocity.y > 0) {
                    hero.position.y = tile.position.y - (hero.height / 2)
                    hero.jump.height = 0
                    hero.jump.count = 0
                } else if(hero.velocity.y < 0) {
                    hero.position.y = tile.position.y + 1 + (hero.height / 2)
                    hero.jump.height = hero.jump.maxheight
                }
                hero.velocity.y = 0
            }
        }
        var xtiles = this.getTiles({
            width: hero.width,
            height: hero.height,
            position: hero.position,
            velocity: {
                x: hero.velocity.x,
                y: 0
            }
        })
        for(var index in xtiles) {
            var tile = xtiles[index]
            if(tile != undefined
            && tile.hasCollision) {
                if(hero.velocity.x > 0) {
                    hero.position.x = tile.position.x - (hero.width / 2)
                    hero.clinging = "WEST"
                } else if(hero.velocity.x < 0) {
                    hero.position.x = tile.position.x + 1 + (hero.width / 2)
                    hero.clinging = "EAST"
                }
                hero.velocity.x = 0
            }
        }
    },
    getTiles: function(box) {
        var tiles = new Array()
        var x = box.position.x + box.velocity.x
        var y = box.position.y + box.velocity.y
        for(var tx = x - (box.width / 2); tx < Math.ceil(x + (box.width / 2)); tx++) {
            for(var ty = y - (box.height / 2); ty < Math.ceil(y + (box.height / 2)); ty++) {
                tiles.push(this.getTile(tx, ty))
            }
        }
        return tiles
    }
})

module.exports = WorldStore
