var Frame = require("<scripts>/functions/Frame")

var Camera = function() {
    this.position = {
        x: 0, y: 0
    }
    this.origin = {
        x: 0, y: 0
    }
    this.speed = 8
}

Camera.prototype.update = function(tick) {
    //?!
}

Camera.prototype.setFocus = function(position) {
    this.position.x = position.x
    this.position.x = Math.min(Math.max(0, this.position.x), game.world.width - game.frame.width)
    this.position.y = position.y
    this.position.y = (Math.floor(this.position.y / 8) * 8) - 8
    this.position.y = Math.min(Math.max(0, this.position.y), game.world.height - game.frame.height)
}

module.exports = Camera
