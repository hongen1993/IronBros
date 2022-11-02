class PowerUp {
    position = { x: 30, y: 0 }
    velocity = { x: 0, y: 0 }
    dimensions = { width: 40, height: 40 }
    type = "powerup" // 1up, star, ... 
    isJumping = true
    isActivated = false

    sprites = {}
    sprite = null
    framesCountToActivate = 0

    constructor({
        position,
        dimensions,
        type = "powerup",
        velocity = { x: 3, y: 0 },
        sprite = null,
        activationFrames = 0
    }) {
        this.position = position
        this.dimensions = dimensions
        this.velocity = velocity
        this.bounceVelocity = velocity.y
        this.type = type
        this.sprite = sprite
        this.isActivated = false
        this.activationFrames = activationFrames
        this.framesCountToActivate = 0

    }

    update(fps) {

        this.framesCountToActivate += 1
        if (this.framesCountToActivate >= this.activationFrames) {
            this.isActivated = true
        }

        if (this.isActivated) {

            if (this.sprite !== null) this.sprite.nextFrame(fps, 1)

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

            this.position.y += this.velocity.y
            this.velocity.y += GRAVITY

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
                    this.velocity.x = -this.velocity.x
                    break
                }
            }

            // check move beyond start of map
            if (this.position.x + this.velocity.x < 0) {
                this.velocity.x = -this.velocity.x
            }

            this.position.x += this.velocity.x
        }

        this.draw()
    }

    draw() {
        //draw only if it is in canvas window
        if (
            this.position.x + this.dimensions.width - scrollX > 0 &&
            this.position.x - scrollX < canvas.width
        ) {

            let height = this.dimensions.height
            if (this.framesCountToActivate < this.activationFrames) {
                height = Math.ceil(this.dimensions.height * this.framesCountToActivate / this.activationFrames)
            }

            if (this.sprite == null) {
                switch (this.type) {
                    case PLAYER_POWERS.SUPER: ctx.fillStyle = "yellow"
                        break
                    case PLAYER_POWERS.FIREBALL: ctx.fillStyle = "red"
                        break
                    case PLAYER_POWERS.INVINCIBLE: ctx.fillStyle = "gold"
                        break
                    case PLAYER_POWERS.ONEUP: ctx.fillStyle = "lightgreen"
                        break
                    default: ctx.fillStyle = "blue"
                        break
                }
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
                    growingHeight: height
                })
            }
        }
    }
}