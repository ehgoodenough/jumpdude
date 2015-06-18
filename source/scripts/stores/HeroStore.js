var WorldStore = require("<scripts>/stores/WorldStore")

var HeroStore = Phlux.createStore({
    data: {
        width: 1,
        height: 1.5,
        color: "#FC0",
        maxvelocity: {
            x: 0.25,
            y: 0.45
        },
        move: {
            force: 5
        },
        jump: {
            force: -10,
            count: 0,
            maxcount: 1,
            height: 0,
            maxheight: 2,
            //maxheight: 2.5
        },
        friction: 2,
        gravity: 2.5,
        maxhealth: 10,
        spawn: {
            position: {
                x: 10,
                y: 13.25
            }
        },
        direction: "LEFT",
        powerups: {
            highjump: false,
            doublejump: false,
            featherfall: false,
            morphball: false,
            dashattack: true,
            wallgrip: true,
        }
    },
    updateHero: function(tick) {
        var hero = this.data
        
        if(hero.powerups.highjump) {
            hero.jump.maxheight = 4
        } if(hero.powerups.doublejump) {
            hero.jump.maxcount = 2
        } if(hero.powerups.featherfall) {
            //?!
        } if(hero.powerups.morphball) {
            hero.height = hero.width
            hero.radius = true
        }
        
        // Defaults
        if(hero.position == undefined) {
            hero.position = {
                x: hero.spawn.position.x,
                y: hero.spawn.position.y
            }
        }
        if(hero.velocity == undefined) {
            hero.velocity = {
                x: 0,
                y: 0
            }
        }
        if(hero.health == undefined) {
            hero.health = hero.maxhealth
        }

        // Keyboard Input
        if(Keyb.isJustDown("W")) {
            if(hero.jump.count < hero.jump.maxcount) {
                hero.jump.count += 1
                hero.jump.height = 0
            }
        } if(Keyb.isDown("W")) {
            if(hero.jump.height < hero.jump.maxheight) {
                hero.velocity.y = hero.jump.force
            }
        } if(Keyb.isDown("A")) {
            hero.velocity.x -= hero.move.force * tick
            hero.direction = "LEFT"
        } if(Keyb.isDown("D")) {
            hero.velocity.x += hero.move.force * tick
            hero.direction = "RIGHT"
        } if(Keyb.isJustDown("<space>")) {
            if(hero.powerups.dashattack) {
                hero.maxvelocity.x = 2
                if(hero.direction == "LEFT") {
                    hero.velocity.x = -hero.maxvelocity.x
                } else if(hero.direction == "RIGHT") {
                    hero.velocity.x = hero.maxvelocity.x
                }
            }
        }

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
        if(hero.powerups.dashattack) {
            if(hero.maxvelocity.x > 0.25) {
                hero.maxvelocity.x /= 2
            }
        }

        // Collision with World
        WorldStore.collide(hero)

        // Translation
        hero.position.x += hero.velocity.x
        hero.position.y += hero.velocity.y

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
        if(hero.powerups.featherfall) {
            if(hero.velocity.y > 0) {
                hero.velocity.y += (hero.gravity / 10) * tick
            } else {
                hero.velocity.y += hero.gravity * tick
            }
        } else {
            hero.velocity.y += hero.gravity * tick
        }
        if(hero.velocity.y < 0) {
            hero.jump.height -= hero.velocity.y
        }

        // Effects from World
        var damage = 0
        var tiles = WorldStore.getTiles(hero)
        for(var index in tiles) {
            var tile = tiles[index]
            if(tile.inflictsDamage != undefined) {
                if(parseInt(tile.inflictsDamage) > damage) {
                    damage = parseInt(tile.inflictsDamage)
                }
            }
        }
        hero.health -= damage

        for(var index in tiles) {
            var tile = tiles[index]
            if(tile.resetsSpawn != undefined) {
                if(hero.spawn.position.x != tile.position.x + (hero.width / 2)
                || hero.spawn.position.y != tile.position.y + (hero.height / 2)) {
                    hero.spawn.position = {
                        x: tile.position.x + (hero.width / 2),
                        y: tile.position.y + (hero.height / 2)
                    }
                }
            }
        }

        // Death
        if(hero.health <= 0) {
            delete hero.position
            delete hero.velocity
            delete hero.health
        }

        // Defaults
        if(hero.position == undefined) {
            hero.position = {
                x: hero.spawn.position.x,
                y: hero.spawn.position.y
            }
        }
        if(hero.velocity == undefined) {
            hero.velocity = {
                x: 0,
                y: 0
            }
        }
        if(hero.health == undefined) {
            hero.health = hero.maxhealth
        }

        this.trigger()
    }
})

module.exports = HeroStore
