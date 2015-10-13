var Keyboard = require("<scripts>/functions/Keyboard")

var Hero = function() {
    var protohero = {
        width: 1,
        height: 1.5,
        color: "#FC0",
        position: {
            x: 3,
            y: 148
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
    }
    for(var key in protohero) {
        this[key] = protohero[key]
    }
}

Hero.prototype.update = function(tick) {
    // this responds to keyboard input
    if(Keyboard.isJustDown("W")) {
        if(this.jump.height < this.maximum.jump.height) {
            this.velocity.y = this.maximum.velocity["-y"]
        }
    } if(Keyboard.isDown("A")) {
        this.velocity.x -= 3.5 * tick
        this.direction.x = "left"
    } if(Keyboard.isDown("D")) {
        this.velocity.x += 3.5 * tick
        this.direction.x = "right"
    }

    // this is affected by gravity
    this.velocity.y += 2.5 * tick

    // this is limited by maximum velocity
    if(this.velocity.y < this.maximum.velocity["-y"]) {
        this.velocity.y = this.maximum.velocity["-y"]
    } if(this.velocity.y > this.maximum.velocity["+y"]) {
        this.velocity.y = this.maximum.velocity["+y"]
    } if(this.velocity.x < this.maximum.velocity["-x"]) {
        this.velocity.x = this.maximum.velocity["-x"]
    } if(this.velocity.x > this.maximum.velocity["+x"]) {
        this.velocity.x = this.maximum.velocity["+x"]
    }

    // this collides with the world
    var tiles = game.world.getTiles({
        "x1": this.position.x - (this.width / 2),
        "x2": this.position.x + (this.width / 2),
        "y1": this.position.y - (this.height / 2),
        "y2": this.position.y + (this.height / 2),
        "dy": this.velocity.y
    })
    for(var index in tiles) {
        var tile = tiles[index]
        if(tile.hasCollision) {
            if(this.velocity.y > 0) {
                this.position.y = tile.position.y
                this.position.y -= this.height / 2
                this.velocity.y = 0
                this.jump.height = 0
                game.camera.setFocus(this.position)
            } else if(this.velocity.y < 0) {
                this.position.y = tile.position.y + 1
                this.position.y += this.height / 2
                this.velocity.y = 0
                this.jump.height = this.maximum.jump.height
            }
        }
    }
    var tiles = game.world.getTiles({
        "x1": this.position.x - (this.width / 2),
        "x2": this.position.x + (this.width / 2),
        "y1": this.position.y - (this.height / 2),
        "y2": this.position.y + (this.height / 2),
        "dx": this.velocity.x
    })
    for(var index in tiles) {
        var tile = tiles[index]
        if(tile.hasCollision) {
            if(this.velocity.x > 0) {
                this.position.x = tile.position.x
                this.position.x -= this.width / 2
                this.velocity.x = 0
            } else if(this.velocity.x < 0) {
                this.position.x = tile.position.x + 1
                this.position.x += this.width / 2
                this.velocity.x = 0
            }
        }
    }

    // this is moved by velocity
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // this wraps around the world
    if(this.position.x < 0) {
        this.position.x = game.world.getWidth()
    } if(this.position.x > game.world.getWidth()) {
        this.position.x = 0
    }

    // this tracks height of jumps
    if(this.velocity.y < 0) {
        this.jump.height -= this.velocity.y
    }

    // this decelerates from friction
    if(this.velocity.x > 0) {
        this.velocity.x -= 1.5 * tick
        if(this.velocity.x < 0) {
            this.velocity.x = 0
        }
    } else if(this.velocity.x < 0) {
        this.velocity.x += 1.5 * tick
        if(this.velocity.x > 0) {
            this.velocity.x = 0
        }
    }

    // this tracks the world
    this.tiles = game.world.getTiles({
        "x1": this.position.x - (this.width / 2),
        "x2": this.position.x + (this.width / 2),
        "y1": this.position.y - (this.height / 2),
        "y2": this.position.y + (this.height / 2)
    })
}

module.exports = Hero
