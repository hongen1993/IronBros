class Platform {
    position = { x: 0, y: 0 }
    velocity = { x: 0, y: 0 }
    dimensions = { width: 50, height: 100 }
    collisions = { vertical: false, horizontal: false }
    color = "lightbrown"
    img = null
    visible = true

    constructor({
        position,
        dimensions,
        color = "lightbrown",
        collisions = { vertical: true, horizontal: true },
        visible = true,
    }) {
        this.position = position
        this.maxY = position.y
        this.dimensions = dimensions
        this.color = color
        this.collisions = collisions
        this.visible = visible
        switch (true) {
            case color === "lightbrown":
            case color === "multitreat":
            case color === "starhidden":
                this.img = imageStore.brownBlock
                break
            case color === "darkred":
                this.img = imageStore.redBlock
                break
            case color === "lightgreen":
                this.img = imageStore.floorBlock
                break
            case color === "green":
                this.img = imageStore.pipe
                break
            case color === "powerup":
            case color === "treat":
            case color === "1up":
            case color === "star":
                this.img = imageStore.surpriseBlock
                break
            case color === "disabled":
                this.img = imageStore.disabledBlock
                break
        }
    }

    hitByPlayer(powers, from = 'bottom') {
        if (!this.visible) {
            this.visible = true
        }

        if (this.color === 'disabled') return

        if (from === 'bottom') {
            if (this.color === 'treat' || this.color === 'powerup' || this.color === '1up' || this.color === 'starhidden' || this.color === 'star') {
                // if powerup - check player powers and deternmine type of power up, based on that create power up on top of platform and add to power up array, play sound
                if (this.color === 'powerup') {
                    switch (powers) {
                        case PLAYER_POWERS.SUPER:
                        case PLAYER_POWERS.FIREBALL:
                            powerUps.push(new PowerUp({
                                position: { x: this.position.x, y: this.position.y - 50 },
                                dimensions: { width: 50, height: 50 },
                                type: PLAYER_POWERS.FIREBALL,
                                velocity: { x: 0, y: 0 },
                                sprite: new Sprite({
                                    img: imageStore.powerUp,
                                    framesCount: 3,
                                    position: { x: 0, y: 50 },
                                    offset: { x: 50, y: 0 },
                                    printOffset: { x: 0, y: 0 },
                                    dimensions: { width: 50, height: 50 },
                                    framesRefreshFrequency: 6,
                                }),
                                activationFrames: 30,
                            }))
                            playAudio(audioStore.powerUpEffect)
                            break
                        case PLAYER_POWERS.NONE:
                            powerUps.push(new PowerUp({
                                position: { x: this.position.x, y: this.position.y - 50 },
                                dimensions: { width: 50, height: 50 },
                                type: PLAYER_POWERS.SUPER,
                                velocity: { x: 3, y: 0 },
                                sprite: new Sprite({
                                    img: imageStore.powerUp,
                                    framesCount: 12,
                                    position: { x: 0, y: 0 },
                                    offset: { x: 50, y: 0 },
                                    printOffset: { x: 0, y: 0 },
                                    dimensions: { width: 50, height: 50 },
                                    framesRefreshFrequency: 10,
                                }),
                                activationFrames: 30,
                            }))
                            playAudio(audioStore.powerUpEffect)
                            break
                    }
                } else if (this.color === '1up') {
                    powerUps.push(new PowerUp({
                        position: { x: this.position.x, y: this.position.y - 50 },
                        dimensions: { width: 50, height: 50 },
                        type: PLAYER_POWERS.ONEUP,
                        velocity: { x: -3, y: 0 },
                        sprite: new Sprite({
                            img: imageStore.powerUp,
                            framesCount: 8,
                            position: { x: 0, y: 150 },
                            offset: { x: 50, y: 0 },
                            printOffset: { x: 0, y: 0 },
                            dimensions: { width: 50, height: 50 },
                            framesRefreshFrequency: 12,
                        }),
                        activationFrames: 20,
                    }))
                    playAudio(audioStore.powerUpEffect)
                } else if (this.color === 'star' || this.color === 'starhidden') {
                    powerUps.push(new PowerUp({
                        position: { x: this.position.x, y: this.position.y - 50 },
                        dimensions: { width: 50, height: 50 },
                        type: PLAYER_POWERS.INVINCIBLE,
                        velocity: { x: 3, y: -14 },
                        sprite: new Sprite({
                            img: imageStore.powerUp,
                            framesCount: 1,
                            position: { x: 0, y: 100 },
                            offset: { x: 50, y: 0 },
                            printOffset: { x: 0, y: 0 },
                            dimensions: { width: 50, height: 50 },
                            framesRefreshFrequency: 10,
                        }),
                    }))
                    playAudio(audioStore.powerUpEffect)
                } else if (this.color === 'treat') {
                    const treatEffect = new Effect({
                        position: { x: this.position.x, y: this.position.y - 50 },
                        dimensions: { width: 50, height: 50 },
                        velocity: { x: 0, y: -16 },
                        run: 'once',
                        sprite: new Sprite({
                            img: imageStore.treat,
                            framesCount: 11,
                            position: { x: 0, y: 0 },
                            offset: { x: 64, y: 0 },
                            printOffset: { x: 0, y: 0 },
                            dimensions: { width: 64, height: 64 },
                            margin: { top: 7, bottom: 7, left: 7, right: 7 },
                            framesRefreshFrequency: 2,
                        })
                    })
                    effects.push(treatEffect)
                    game.addTreats(1)
                    game.addPoints({ action: ACTIONS.COLLECTTREAT, position: { x: this.position.x + 15, y: this.position.y - 20 } })
                }
                // if 1up - create 1up on top of platform and add to powerup array, play sound
                // if star or starhidden - create 1up on top of platform and add to powerup array, play sound
                this.color = 'disabled'
                this.img = imageStore.disabledBlock
            }
            if (this.color === 'multitreat') {
                const treatEffect = new Effect({
                    position: { x: this.position.x, y: this.position.y - 50 },
                    dimensions: { width: 50, height: 50 },
                    velocity: { x: 0, y: -16 },
                    run: 'once',
                    sprite: new Sprite({
                        img: imageStore.treat,
                        framesCount: 11,
                        position: { x: 0, y: 0 },
                        offset: { x: 64, y: 0 },
                        printOffset: { x: 0, y: 0 },
                        dimensions: { width: 64, height: 64 },
                        margin: { top: 7, bottom: 7, left: 7, right: 7 },
                        framesRefreshFrequency: 2,
                    })
                })
                effects.push(treatEffect)
                game.addTreats(1)
                game.addPoints({ action: ACTIONS.COLLECTTREAT, position: { x: this.position.x + 15, y: this.position.y - 20 } })

                setTimeout(() => {
                    this.color = 'disabled'
                    this.img = imageStore.disabledBlock
                }, 3000)
            }
            this.velocity.y = -5
            for (let i = 0; i < monsters.length; i++) {
                const monster = monsters[i]
                if (rectCollision(this.position.x, this.position.y - 5, this.dimensions.width, this.dimensions.height,
                    monster.position.x, monster.position.y, monster.dimensions.width, monster.dimensions.height)) {
                    game.addPoints({ action: ACTIONS.BLOCKMONSTER, position: { x: monster.position.x, y: monster.position.y - 20 } })

                    monster.die(() => monsters.splice(monsters.indexOf(monster), 1))
                    break
                }
            }
        }
    }

    update(fps) {
        this.velocity.y += GRAVITY,
            this.position.y += (this.velocity.y)
        if (this.position.y >= this.maxY) {
            this.velocity.y = 0
            this.position.y = this.maxY
        }
        this.draw()
    }

    draw() {
        if (!this.visible) return

        if (
            this.position.x + this.dimensions.width - scrollX > 0 &&
            this.position.x - scrollX < canvas.width
        ) { // only draw if platform is visible in the screen
            if (this.img !== null && this.color !== 'green') {
                let x = 0
                while (this.img.width > 0 && x < this.dimensions.width) {
                    let y = 0
                    while (this.img.width > 0 && y < this.dimensions.height) {
                        ctx.drawImage(
                            this.img,
                            0,
                            0,
                            this.img.width,
                            this.img.height,
                            this.position.x - scrollX + x,
                            this.position.y + y,
                            this.img.width,
                            this.img.height
                        )
                        y += this.img.height
                    }
                    x += this.img.width
                }
            } else if (this.color === "green") {
                ctx.drawImage(
                    this.img,
                    0,
                    0,
                    this.img.width,
                    this.dimensions.height,
                    this.position.x - scrollX,
                    this.position.y,
                    this.dimensions.width,
                    this.dimensions.height
                )
            } else {
                ctx.drawImage(
                    imageStore.brownBlock,
                    0,
                    0,
                    this.dimensions.width,
                    50,
                    this.position.x - scrollX,
                    this.position.y,
                    this.dimensions.width,
                    this.dimensions.height
                )
            }
        }
    }
}