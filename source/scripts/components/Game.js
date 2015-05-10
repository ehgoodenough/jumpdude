var GameFrame = require("<scripts>/components/GameFrame")

var HeroStore = Phlux.createStore({
    data: {
        position: {
            x: 10,
            y: 2
        },
        velocity: {
            x: 0,
            y: 0
        },
        acceleration: {
            x: 1.5
        },
        width: 1,
        height: 1.5,
        maxvelocity: {
            x: 0.25,
            y: 1
        },
        deacceleration: 0.75
    },
    updateHero: function(tick) {
        var hero = this.data
		// Keyboard Input
        if(Keyb.isDown("A")) {
            hero.velocity.x -= hero.acceleration.x * tick
        } if(Keyb.isDown("D")) {
            hero.velocity.x += hero.acceleration.x * tick
        }
		// Maximum Velocity
        if(hero.velocity.x > hero.maxvelocity.x) {
            hero.velocity.x = hero.maxvelocity.x
        } else if(hero.velocity.x < -hero.maxvelocity.x) {
            hero.velocity.x = -hero.maxvelocity.x
        }
		// Translation and Collision
		if(hero.velocity.x < 0) {
			var dx = hero.position.x + hero.velocity.x - (hero.width / 2)
			var dy = hero.position.y
			var dt = WorldStore.getTile(dx, dy)
			if(dt != undefined && dt.value == 0) {
				hero.position.x += hero.velocity.x
			} else {
				hero.velocity.x = 0
			}
		} else if(hero.velocity.x > 0) {
			var dx = hero.position.x + hero.velocity.x + (hero.width / 2)
			var dy = hero.position.y
			var dt = WorldStore.getTile(dx, dy)
			if(dt != undefined && dt.value == 0) {
				hero.position.x += hero.velocity.x
			} else {
				hero.velocity.x = 0
			}
		}
		// Deacceleration
        if(hero.velocity.x > 0) {
            hero.velocity.x -= hero.deacceleration * tick
            if(hero.velocity.x < 0) {
                hero.velocity.x = 0
            }
        } else if(hero.velocity.x < 0) {
            hero.velocity.x += hero.deacceleration * tick
            if(hero.velocity.x > 0) {
                hero.velocity.x = 0
            }
        }
        
        /*
        hero.velocity.y += 1 * tick
        if(hero.velocity.y > hero.maxvelocity.y) {
            hero.velocity.y = hero.maxvelocity.y
        }
        var dx = hero.position.x
        var dy = hero.position.y + hero.velocity.y + (hero.height / 2)
        if(WorldStore.getTile(dx, dy).value == 0) {
            hero.position.y += hero.velocity.y
        } else {
            hero.velocity.y = 0
        }
        */
        
        this.trigger()
    }
})

var WorldData = require("<assets>/levels/world.json")
var WorldStore = Phlux.createStore({
    data: {
        tiles: {},
        width: 0,
        height: 0
    },
    initiateStore: function() {
        this.data.width = WorldData.width
        this.data.height = WorldData.height
        var tiles = WorldData.layers[0].data
        for(var x = 0; x < WorldData.width; x++) {
            for(var y = 0; y < WorldData.height; y++) {
                var xy = y * WorldData.width + x
                this.data.tiles[x + "x" + y] = {
                    value: WorldData.layers[0].data[xy] - 1,
                    position: {"x": x, "y": y}
                }
            }
        }
    },
    getTile: function(x, y) {
        var x = Math.floor(x)
        var y = Math.floor(y)
        if(x > 0 && x < this.data.width
        && y > 0 && y < this.data.height) {
            return this.data.tiles[x + "x" + y]
        }
    }
})

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

var Hero = React.createClass({
    render: function() {
        return <div style={this.renderStyles()}/>
    },
    renderStyles: function() {
        return {
            position: "absolute",
            top: this.props.data.position.y - (this.props.data.height / 2) + "em",
            left: this.props.data.position.x - (this.props.data.width / 2) + "em",
            width: this.props.data.width + "em",
            height: this.props.data.height + "em",
            backgroundColor: "#FC0"
        }
    }
})

var World = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                style={this.renderStyles()}
                width={this.props.data.width * 64}
                height={this.props.data.height * 64}/>
        )
    },
    renderStyles: function() {
        return {
            "width": this.props.data.width + "em",
            "height": this.props.data.height + "em"
        }
    },
    renderCanvas: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
        for(var coords in this.props.data.tiles) {
            var tile = this.props.data.tiles[coords]
            canvas.fillStyle = this.colors[tile.value]
            var x = tile.position.x * 64
            var y = tile.position.y * 64
            canvas.fillRect(x, y, 64, 64)
        }
    },
    componentDidMount: function() {
        this.renderCanvas()
    },
    shouldComponentUpdate: function(props) {
        return props.data.tiles != this.props.data.tiles
    },
    componentDidUpdate: function() {
        this.renderCanvas()
    },
    colors: {
        "0": "#EEE",
        "1": "#111"
    }
})

module.exports = Game
