var WorldStore = require("<scripts>/stores/WorldStore")

var HeroStore = Phlux.createStore({
    data: {
        entity: {
            width: 1,
            height: 1.5,
            color: "#FC0",
            position: {
                x: 3,
                y: 144
            },
            velocity: {
                x: 0,
                y: 0
            },
            direction: {
                x: "left",
                y: null
            },
            jump: {
                height: 0,
            },
            maximum: {
                velocity: {
                    "-x": -0.25,
                    "+x": 0.25,
                    "-y": -0.7,
                    "+y": 0.7
                },
                jump: {
                    height: 3
                }
            },
        },
        camera: {
            position: {
                x: 3 * -1,
                y: 144 * -1
            }
        },
    },
    updateHero: function(tick) {
        
        var entity = this.data.entity
        var camera = this.data.camera
        
        // entity responds to keyboard input
        if(Keyb.isJustDown("W")) {
            if(entity.jump.height < entity.maximum.jump.height) {
                entity.velocity.y = entity.maximum.velocity["-y"]
            }
        }
        if(Keyb.isDown("A")) {
            entity.velocity.x -= 3.5 * tick
            entity.direction.x = "left"
        }
        if(Keyb.isDown("D")) {
            entity.velocity.x += 3.5 * tick
            entity.direction.x = "right"
        }
        
        // entity is affected by gravity
        entity.velocity.y += 2.5 * tick
        
        // entity is limited by maximum velocity
        if(entity.velocity.y < entity.maximum.velocity["-y"]) {
            entity.velocity.y = entity.maximum.velocity["-y"]
        }
        if(entity.velocity.y > entity.maximum.velocity["+y"]) {
            entity.velocity.y = entity.maximum.velocity["+y"]
        }
        if(entity.velocity.x < entity.maximum.velocity["-x"]) {
            entity.velocity.x = entity.maximum.velocity["-x"]
        }
        if(entity.velocity.x > entity.maximum.velocity["+x"]) {
            entity.velocity.x = entity.maximum.velocity["+x"]
        }
        
        // entity collides with the world
        var tiles = WorldStore.getTiles({
            "x1": entity.position.x - (entity.width / 2),
            "x2": entity.position.x + (entity.width / 2),
            "y1": entity.position.y - (entity.height / 2),
            "y2": entity.position.y + (entity.height / 2),
            "dy": entity.velocity.y
        })
        for(var index in tiles) {
            var tile = tiles[index]
            if(tile.hasCollision) {
                if(entity.velocity.y > 0) {
                    entity.position.y = tile.position.y
                    entity.position.y -= entity.height / 2
                    entity.velocity.y = 0
                    entity.jump.height = 0
                } else if(entity.velocity.y < 0) {
                    entity.position.y = tile.position.y + 1
                    entity.position.y += entity.height / 2
                    entity.velocity.y = 0
                    entity.jump.height = entity.maximum.jump.height
                }
            }
        }
        var tiles = WorldStore.getTiles({
            "x1": entity.position.x - (entity.width / 2),
            "x2": entity.position.x + (entity.width / 2),
            "y1": entity.position.y - (entity.height / 2),
            "y2": entity.position.y + (entity.height / 2),
            "dx": entity.velocity.x
        })
        for(var index in tiles) {
            var tile = tiles[index]
            if(tile.hasCollision) {
                if(entity.velocity.x > 0) {
                    entity.position.x = tile.position.x
                    entity.position.x -= entity.width / 2
                    entity.velocity.x = 0
                } else if(entity.velocity.x < 0) {
                    entity.position.x = tile.position.x + 1
                    entity.position.x += entity.width / 2
                    entity.velocity.x = 0
                }
            }
        }
        
        // entity is moved by velocity
        entity.position.x += entity.velocity.x
        entity.position.y += entity.velocity.y
        
        // entity wraps around the world
        if(entity.position.x < 0) {
            entity.position.x = WorldStore.getWidth()
        }
        if(entity.position.x > WorldStore.getWidth()) {
            entity.position.x = 0
        }
        
        // entity tracks height of jumps
        if(entity.velocity.y < 0) {
            entity.jump.height -= entity.velocity.y
        }
        
        // entity decelerates from friction
        if(entity.velocity.x > 0) {
            entity.velocity.x -= 1.5 * tick
            if(entity.velocity.x < 0) {
                entity.velocity.x = 0
            }
        } else if(entity.velocity.x < 0) {
            entity.velocity.x += 1.5 * tick
            if(entity.velocity.x > 0) {
                entity.velocity.x = 0
            }
        }
        
        // entity tracks the world
        entity.tiles = WorldStore.getTiles({
            "x1": entity.position.x - (entity.width / 2),
            "x2": entity.position.x + (entity.width / 2),
            "y1": entity.position.y - (entity.height / 2),
            "y2": entity.position.y + (entity.height / 2)
        })
        
        // camera follows the entity
        camera.position.x = (entity.position.x - (WIDTH / 2))
        camera.position.y = (entity.position.y - (HEIGHT / 2))
        
        // camera fits within screen
        if(camera.position.x < 0) {
            camera.position.x = 0
        }
        if(camera.position.x > WorldStore.getWidth() - WIDTH) {
            camera.position.x = WorldStore.getWidth() - WIDTH
        }
        if(camera.position.y < 0) {
            camera.position.y = 0
        }
        if(camera.position.y > WorldStore.getHeight() - HEIGHT) {
            camera.position.y = WorldStore.getHeight() - HEIGHT
        }
        
        this.trigger()
    }
})

module.exports = HeroStore
