var WorldStore = require("<scripts>/stores/WorldStore")

var HeroStore = Phlux.createStore({
    data: {
        width: 1,
        height: 1.5,
        color: "#FC0",
        position: {
            x: 10,
            y: 13.25
        },
        velocity: {
            x: 0,
            y: 0
        },
        maxvelocity: {
            x: 0.25,
            y: 0.75
        },
        move: {
            force: 2.5
        },
        jump: {
            force: 25,
            count: 0,
            maxcount: 2,
            height: 0,
            maxheight: 3,
        },
        friction: 0.75,
        gravity: 2.5
    },
    updateHero: function(tick) {
        var hero = this.data
        
        // Keyboard Input
        if(Keyb.isJustDown("W")) {
            if(hero.jump.count < hero.jump.maxcount) {
                hero.jump.count += 1
                hero.jump.height = 0
            }
        } if(Keyb.isDown("W")) {
            if(hero.jump.height < hero.jump.maxheight) {
                hero.velocity.y = -hero.jump.force * tick
            }
        } if(Keyb.isDown("A")) {
            hero.velocity.x -= hero.move.force * tick
        } if(Keyb.isDown("D")) {
            hero.velocity.x += hero.move.force * tick
        }
        
        // Gravity
        hero.velocity.y += hero.gravity * tick
        
        // Maximum Velocity
        if(hero.velocity.x > hero.maxvelocity.x) {
            hero.velocity.x = hero.maxvelocity.x
        } if(hero.velocity.x < -hero.maxvelocity.x) {
            hero.velocity.x = -hero.maxvelocity.x
        } if(hero.velocity.y > hero.maxvelocity.y) {
            hero.velocity.y = hero.maxvelocity.y
        } if(hero.velocity.y < -hero.maxvelocity.y) {
            hero.velocity.y = -hero.maxvelocity.y
        }
        
        // Collision with World
        WorldStore.collide(hero)
        
        // Translation
        hero.position.x += hero.velocity.x
        hero.position.y += hero.velocity.y
        
        // Jumps
        if(hero.velocity.y < 0) {
            hero.jump.height -= hero.velocity.y
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

module.exports = HeroStore
