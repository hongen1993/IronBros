class Effect {
    position = { x: 0, y: 0 }
    velocity = { x: 0, y: 0 }
    dimensions = { width: 20, height: 20 }
    sprite = null
    run = 'once'

    constructor({
        position,
        velocity = { x: 0, y: 0 },
        dimensions = { width: 20, height: 20 },
        sprite = null,
        run = 'once',
        applyGravity = true
    }) {
        this.velocity = velocity
        this.position = position
        this.dimensions = dimensions
        this.sprite = sprite
        this.run = run
        this.applyGravity = applyGravity
    }

    update(fps) {
        if (this.applyGravity)
            this.velocity.y += (GRAVITY)
        this.position.y += (this.velocity.y)
        this.position.x += (this.velocity.x)

        if (this.run !== 'once-and-stay-in-last-frame' || (this.run === 'once-and-stay-in-last-frame' && this.sprite.framesCurrent + 1 !== this.sprite.framesCount))
            this.sprite.nextFrame(fps, 1)
        this.draw()

        if (
            this.position.x + this.dimensions.width - scrollX < 0 ||
            this.position.x - scrollX > canvas.width ||
            this.position.y > canvas.height ||
            (this.run === 'once' && this.sprite.framesCurrent + 1 === this.sprite.framesCount)
        ) {
            //if out of view or it showed all frames and it was runOnce then remove object 
            effects.splice(effects.indexOf(this), 1)
        }

    }

    draw() {
        this.sprite.draw({
            position: this.position,
            dimensions: this.dimensions
        })
    }

}

class PointEffect extends Effect {
    constructor({
        position,
        velocity = { x: 0.5, y: -1 },
        value,
        expireAfter = 1500,
    }) {
        super({
            position,
            velocity,
            dimensions: { width: 20, height: 20 },
            applyGravity: false
        })
        this.value = value
        this.expireTime = Date.now() + expireAfter
    }

    update() {
        if (this.applyGravity)
            this.velocity.y += (GRAVITY)
        this.position.y += (this.velocity.y)
        this.position.x += Math.sign(Math.random() - 0.5) * (this.velocity.x)

        if (Date.now() >= this.expireTime) {
            effects.splice(effects.indexOf(this), 1)
            return
        }
        this.draw()
    }

    draw() {
        let x = this.position.x - scrollX

        if (x < 0) x = 10
        if (x > canvas.width - 30) x = canvas.width - 30

        ctx.font = '7px "Press Start 2P"'
        ctx.fillStyle = 'rgba(255,255,255,0.7)'
        ctx.strokeStyle = 'rgba(128,128,128,0.5)'
        ctx.strokeText(this.value, x + 1, this.position.y + 1)
        ctx.fillText(this.value, x, this.position.y)
    }

}