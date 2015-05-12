var HeroStore = Phlux.createStore({
    data: {
        width: 1,
        height: 1.5,
        color: "#FC0",
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
        
        // Translation and Collision
        if(hero.velocity.x < 0) {
            if(hero.position.x - (hero.width / 2) + hero.velocity.x > 0) {
                hero.position.x += hero.velocity.x
            } else {
                hero.velocity.x /= 2
                hero.position.x = 0 + (hero.width / 2)
            }
        } else if(hero.velocity.x > 0) {
            if(hero.position.x + (hero.width / 2) + hero.velocity.x < WIDTH) {
                hero.position.x += hero.velocity.x
            } else {
                hero.velocity.x /= 2
                hero.position.x = WIDTH - (hero.width / 2)
            }
        } if(hero.velocity.y < 0) {
            if(hero.position.y - (hero.height / 2) + hero.velocity.y > 0) {
                hero.position.y += hero.velocity.y
            } else {
                hero.velocity.y /= 2
                hero.position.y = 0 + (hero.height / 2)
            }
        } else if(hero.velocity.y > 0) {
            if(hero.position.y + (hero.height / 2) + hero.velocity.y < HEIGHT) {
                hero.position.y += hero.velocity.y
            } else {
                hero.velocity.y /= 2
                hero.position.y = HEIGHT - (hero.height / 2)
                hero.jump.count = 0
            }
        }
        
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
