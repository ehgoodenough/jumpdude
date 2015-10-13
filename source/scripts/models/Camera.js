var Frame = require("<scripts>/functions/Frame")

var Camera = function() {
    this.position = {
        x: 0, y: 0
    }
}

Camera.prototype.update = function(tick) {
    this.position.x = (game.hero.position.x - (Frame.width / 2))
    this.position.y = (game.hero.position.y - (Frame.height / 2))

    if(this.position.x < 0) {
        this.position.x = 0
    } if(this.position.x > game.world.getWidth() - Frame.width) {
        this.position.x = game.world.getWidth() - Frame.width
    } if(this.position.y < 0) {
        this.position.y = 0
    } if(this.position.y > game.world.getHeight() - Frame.height) {
        this.position.y = game.world.getHeight() - Frame.height
    }
}

module.exports = Camera
