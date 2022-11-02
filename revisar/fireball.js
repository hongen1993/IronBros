class FireBall {
    position = { x: 30, y: 0 }
    velocity = { x: 0, y: 0 }
    dimensions = { width: 5, height: 5 }
    isJumping = true
    isAlive = true

    sprites = {}
    sprite = null

    constructor({
        position,
        dimensions,
        velocity = { x: 5, y: 5 },
        sprites = {}
    }) {
        this.position = position
        this.dimensions = dimensions
        this.velocity = velocity
        this.bounceVelocity = -Math.abs(velocity.y * 3)
        this.sprites = sprites
        if (this.sprites.fire) this.sprite = this.sprites.fire
    }

    update(fps) {

        if (this.sprite !== null) this.sprite.nextFrame(fps, 1)

        if (this.isAlive) {

            // check collisions with platforms from top to down
            for (let i = 0; i < platforms.length; i++) {
                const platform = platforms[i]
                if (
                    platform.visible &&
                    this.position.y + this.dimensions.height <= platform.position.y &&
                    this.position.y + this.dimensions.height + this.velocity.y >=
                    platform.position.y &&
                    this.position.x + this.velocity.x <
                    platform.position.x + platform.dimensions.width &&
                    this.position.x + this.dimensions.width + this.velocity.x >
                    platform.position.x
                ) {
                    this.position.y = platform.position.y - this.dimensions.height
                    this.velocity.y = this.bounceVelocity
                    break
                }
            }

            // check collisions with platforms from bottom to top
            for (let i = 0; i < platforms.length; i++) {
                const platform = platforms[i]
                if (
                    platform.collisions.vertical &&
                    rectCollision(
                        this.position.x,
                        this.position.y + this.velocity.y,
                        this.dimensions.width,
                        this.dimensions.height,
                        platform.position.x,
                        platform.position.y,
                        platform.dimensions.width,
                        platform.dimensions.height
                    )
                ) {
                    if (this.position.y > platform.position.y) {
                        this.position.y = platform.position.y + platform.dimensions.height
                    }
                    this.velocity.y = 0
                    break
                }
            }

            this.position.y += (this.velocity.y)
            this.velocity.y += (GRAVITY)

            // check colission with monsters
            for (let i = 0; i < monsters.length; i++) {
                const monster = monsters[i]
                if (
                    monster.isActivated &&
                    monster.isAlive &&
                    rectCollision(
                        this.position.x + this.velocity.x,
                        this.position.y,
                        this.dimensions.width,
                        this.dimensions.height,
                        monster.position.x,
                        monster.position.y,
                        monster.dimensions.width,
                        monster.dimensions.height
                    )
                ) {
                    game.addPoints({ action: ACTIONS.FIREBALLMONSTER, position: { x: monster.position.x, y: monster.position.y - 20 } })
                    monster.die(() => monsters.splice(monsters.indexOf(monster), 1))
                    fireballs.splice(fireballs.indexOf(this), 1)
                    return
                }
            }

            // check collissions with platforms horizontally
            for (let i = 0; i < platforms.length; i++) {
                const platform = platforms[i]
                if (
                    platform.collisions.horizontal &&
                    rectCollision(
                        this.position.x + this.velocity.x,
                        this.position.y,
                        this.dimensions.width,
                        this.dimensions.height,
                        platform.position.x,
                        platform.position.y,
                        platform.dimensions.width,
                        platform.dimensions.height
                    )
                ) {
                    this.die(() => fireballs.splice(fireballs.indexOf(this), 1), true)
                    return
                }
            }

            // check move beyond start of map
            if (this.position.x + this.velocity.x < 0) {
                fireballs.splice(fireballs.indexOf(this), 1)
                return
            }

            // check move beyond bottom of canvas
            if (this.position.y + this.velocity.y > canvas.height) {
                fireballs.splice(fireballs.indexOf(this), 1)
                return
            }


            this.position.x += (this.velocity.x)
        }

        this.draw()
    }

    draw() {
        //draw only if it is in canvas window
        if (
            this.position.x + this.dimensions.width - scrollX > 0 &&
            this.position.x - scrollX < canvas.width
        ) {
            if (this.sprite == null) {
                ctx.fillStyle = "red"
                ctx.fillRect(
                    this.position.x - scrollX,
                    this.position.y,
                    this.dimensions.width,
                    this.dimensions.height
                )
            } else {
                this.sprite.draw({
                    position: this.position,
                    dimensions: this.dimensions,
                })
            }
        }
    }

    die(cb, hitBlock = false) {
        if (hitBlock &&
            this.position.x + this.dimensions.width - scrollX > 0 &&
            this.position.x - scrollX < canvas.width &&
            this.position.y < canvas.height) {
            playAudio(audioStore.fireballHitBlockEffect)
        }
        this.isAlive = false
        this.isDying = true
        if (this.sprites.explote) this.sprite = this.sprites.explote
        setTimeout(cb, 300)
    }
}