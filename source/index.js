var Loop = require("<scripts>/functions/Loop")

var Hero = require("<scripts>/models/Hero")
var World = require("<scripts>/models/World")
var Camera = require("<scripts>/models/Camera")

window.game = {
    hero: new Hero(),
    world: new World(),
    camera: new Camera(),
    frame: {
        width: 15,
        height: 17,
    }
}

var HeroView = require("<scripts>/views/HeroView")
var WorldView = require("<scripts>/views/WorldView")
var FrameView = require("<scripts>/views/FrameView")
var CameraView = require("<scripts>/views/CameraView")

var React = require("react")

var GameView = React.createClass({
    render: function() {
        return (
            <FrameView width={game.frame.width} height={game.frame.height}>
                <CameraView data={game.camera}>
                    <WorldView data={game.world}/>
                    <HeroView data={game.hero}/>
                </CameraView>
            </FrameView>
        )
    },
    componentDidMount: function() {
        game.camera.setFocus(game.hero.position)
        Loop(function(tick) {
            game.hero.update(tick)
            game.camera.update(tick)
            this.forceUpdate()
        }.bind(this))
    }
})

React.render(<GameView/>, document.body)
