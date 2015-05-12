var GameFrame = require("<scripts>/components/GameFrame")

var HeroStore = Phlux.createStore({
    data: {
        width: 1,
        height: 1.5,
        position: {
            x: 10,
            y: 2
        },
        velocity: {
            x: 0,
            y: 0
        },
        maxvelocity: {
            x: 0.25,
            y: 1
        },
        move: {
            strength: 2.5
        },
        jump: {
            height: 0,
            maxheight: 3,
            strength: 25,
            cooldown: 0
        },
        friction: 0.75,
        gravity: 2.5
    },
    updateHero: function(tick) {
        var hero = this.data
        
        // Keyboard Input
        if(Keyb.isDown("W")) {
            if(hero.jump.cooldown == 0
            && hero.jump.height < hero.jump.maxheight) {
                hero.velocity.y = hero.jump.strength * -1 * tick
            }
        } if(Keyb.isDown("A")) {
            hero.velocity.x -= hero.move.strength * tick
        } if(Keyb.isDown("D")) {
            hero.velocity.x += hero.move.strength * tick
        }
        
        // Gravity
        hero.velocity.y += hero.gravity * tick
        
        // Maximum Velocity
        if(hero.velocity.x > hero.maxvelocity.x) {
            hero.velocity.x = hero.maxvelocity.x
        } else if(hero.velocity.x < -hero.maxvelocity.x) {
            hero.velocity.x = -hero.maxvelocity.x
        } if(hero.velocity.y > hero.maxvelocity.y) {
            hero.velocity.y = hero.maxvelocity.y
        } else if(hero.velocity.y < -hero.maxvelocity.y) {
            hero.velocity.y = -hero.maxvelocity.y
        }
        
        // Translation and Collision
        if(hero.velocity.x < 0) {
            if(hero.position.x - (hero.width / 2) + hero.velocity.x > 0) {
                hero.position.x += hero.velocity.x
            } else {
                hero.velocity.x = 0
                hero.position.x = 0 + (hero.width / 2)
            }
        } else if(hero.velocity.x > 0) {
            if(hero.position.x + (hero.width / 2) + hero.velocity.x < WIDTH) {
                hero.position.x += hero.velocity.x
            } else {
                hero.velocity.x = 0
                hero.position.x = WIDTH - (hero.width / 2)
            }
        } if(hero.velocity.y < 0) {
            hero.jump.height -= hero.velocity.y
            if(hero.position.y - (hero.height / 2) + hero.velocity.y > 0) {
                hero.position.y += hero.velocity.y
            } else {
                hero.velocity.y = 0
                hero.position.y = 0 + (hero.height / 2)
            }
        } else if(hero.velocity.y > 0) {
            if(hero.position.y + (hero.height / 2) + hero.velocity.y < HEIGHT) {
                hero.position.y += hero.velocity.y
            } else {
                hero.velocity.y = 0
                hero.position.y = HEIGHT - (hero.height / 2)
                if(hero.jump.height > 0) {
                    hero.jump.height = 0
                    hero.jump.cooldown = 0.075
                }
            }
        }
        
        // Jumps
        if(hero.jump.cooldown > 0) {
            hero.jump.cooldown -= tick
            if(hero.jump.cooldown < 0) {
                hero.jump.cooldown = 0
            }
        }
        
        // Deacceleration
        if(hero.velocity.x > 0) {
            hero.velocity.x -= hero.friction * tick
            if(hero.velocity.x < 0) {
                hero.velocity.x = 0
            }
        } else if(hero.velocity.x < 0) {
            hero.velocity.x += hero.friction * tick
            if(hero.velocity.x > 0) {
                hero.velocity.x = 0
            }
        }
        
        this.trigger()
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

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(HeroStore, "hero")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="20x15">
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
