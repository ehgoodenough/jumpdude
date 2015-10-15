var Frame = require("<scripts>/functions/Frame")

var Camera = function() {
    this.position = {
        x: 0, y: 0
    }
    this.reposition = {
        x: 0, y: 0
    }
    this.origin = {
        x: 0, y: 0
    }
    this.speed = 8
}

Camera.prototype.update = function(tick) {
    this.position.x = this.reposition.x

    this.position.y += (this.reposition.y - this.position.y) / 8
    if(Math.abs(this.reposition.y - this.position.y) < 0.05) {
        this.position.y = this.reposition.y
    }
}

Camera.prototype.setFocus = function(position, doNotAnimate) {
    this.reposition.x = position.x
    this.reposition.x = Math.min(Math.max(0, this.reposition.x), game.world.width - game.frame.width)
    this.reposition.y = position.y
    this.reposition.y = (Math.floor(this.reposition.y / 8) * 8) - 8
    this.reposition.y = Math.min(Math.max(0, this.reposition.y), game.world.height - game.frame.height)

    if(doNotAnimate == true) {
        this.position.x = this.reposition.x
        this.position.y = this.reposition.y
    }
}

module.exports = Camera
