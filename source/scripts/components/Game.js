var GameFrame = require("<scripts>/components/GameFrame")

var Hero = require("<scripts>/components/Hero")
var World = require("<scripts>/components/World")
var HeroStore = require("<scripts>/stores/HeroStore")
var WorldStore = require("<scripts>/stores/WorldStore")

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(HeroStore, "hero"),
        Phlux.connectStore(WorldStore, "world")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
                <World data={this.state["world"]}/>
                <Hero data={this.state["hero"]}/>
            </GameFrame>
        )
    },
    componentDidMount: function() {
        Tickly.loop(function(tick) {
            HeroStore.updateHero(tick)
        })
    }
})

module.exports = Game
