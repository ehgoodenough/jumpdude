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
            force: 5,
            friction: 2,
        },
        jump: {
            force: -10,
            count: 0,
            maxcount: 2,
            height: 0,
            maxheight: 2,
            //maxheight: 2.5
        },
        gravity: 2.5,
        defaults: {
            hearts: 10,
            position: {
                x: 3,
                y: 144
            },
            velocity: {
                x: 0,
                y: 0
            }
        },
        direction: "LEFT",
    },
    updateHero: function(tick) {
        var hero = this.data
        
        // Defaults
        if(!hero.position) {
            hero.position = {
                x: hero.defaults.position.x,
                y: hero.defaults.position.y
            }
        }
        if(!hero.velocity) {
            hero.velocity = {
                x: hero.defaults.velocity.x,
                y: hero.defaults.velocity.y
            }
        }
        if(!hero.hearts) {
            hero.hearts = hero.defaults.hearts
        }
        
        this.trigger()
    }
})

module.exports = HeroStore
