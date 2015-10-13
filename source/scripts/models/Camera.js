var Frame = require("<scripts>/functions/Frame")

var Camera = function() {
    this.position = {
        x: 0, y: 0
    }
    this.focus = {
        x: 0, y: 0
    }
    this.speed = 100
}

Camera.prototype.update = function(tick) {
    this.focus.x = game.hero.position.x
    this.focus.x = Math.min(Math.max(0, this.focus.x), game.world.width - game.frame.width)
    this.focus.y = game.hero.position.y
    this.focus.y = (Math.floor(this.focus.y / 8) * 8) - 8
    this.focus.y = Math.min(Math.max(0, this.focus.y), game.world.height - game.frame.height)

    if(this.position.y < this.focus.y) {
        this.position.y += this.speed * tick
        if(this.position.y > this.focus.y) {
            this.position.y = this.focus.y
        }
    } if(this.position.y > this.focus.y) {
        this.position.y -= this.speed * tick
        if(this.position.y < this.focus.y) {
            this.position.y = this.focus.y
        }
    }
}

module.exports = Camera
