window.React = require("react")
window.Phlux = require("phlux")
window.Tickly = require("tickly")
window.Keyb = require("keyb")

window.WIDTH = 20
window.HEIGHT = 15

var Hero = require("<scripts>/components/Hero")
var World = require("<scripts>/components/World")
var HeroStore = require("<scripts>/stores/HeroStore")
var WorldStore = require("<scripts>/stores/WorldStore")

var Camera = require("<scripts>/components/Camera")
var GameFrame = require("<scripts>/components/GameFrame")

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(HeroStore, "hero"),
        Phlux.connectStore(WorldStore, "world")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                <Camera target={this.state["hero"]}>
                    <World data={this.state["world"]}/>
                    <Hero data={this.state["hero"]}/>
                </Camera>
                <span>Use WASD to move and jump!</span>
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
