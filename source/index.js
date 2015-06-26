window.React = require("react")
window.Phlux = require("phlux")
window.Tickly = require("tickly")
window.Keyb = require("keyb")

window.WIDTH = 15
window.HEIGHT = 17

var Hero = require("<scripts>/views/Hero")
var World = require("<scripts>/views/World")
var HeroStore = require("<scripts>/stores/HeroStore")
var WorldStore = require("<scripts>/stores/WorldStore")

var Camera = require("<scripts>/views/Camera")
var GameFrame = require("<scripts>/views/GameFrame")

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(HeroStore, "hero"),
        Phlux.connectStore(WorldStore, "world")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="15x17">
                <Camera data={this.state.hero}>
                    <World data={this.state.world}/>
                    <Hero data={this.state.hero}/>
                </Camera>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            HeroStore.updateHero(tick)
        })
    }
})

React.render(<Game/>, document.body)
