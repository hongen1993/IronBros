class Player {
    constructor() {
        this.position = { x: 150, y: 450 }
        this.velocity = { x: 0, y: 0 }
        this.dimensions = { width: 40, height: 40 }
        this.resizeDimensions = { ...this.dimensions }
        this.direction = "right"
        this.isJumping = true
        this.isAlive = true
        this.coolingDown = false
        this.isDiying = false
        this.hasWon = false
        this.isWinning = false
        this.powers = PLAYER_POWERS.NONE
        this.isInvincible = false
        this.offsetModes = {
            none: 0,
            super: 192,
            fireball: 192 * 2,
            invincible: 192 * 3
        }
        this.sprites = {
            runRight: new Sprite({
                img: imageStore.player,
                framesCount: 2,
                position: { x: 0, y: 0 },
                offset: { x: 128, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
            runLeft: new Sprite({
                img: imageStore.player,
                framesCount: 2,
                position: { x: 0, y: 64 },
                offset: { x: 128, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
            standRight: new Sprite({
                img: imageStore.player,
                framesCount: 3,
                position: { x: 0, y: 4 * 64 },
                offset: { x: 64, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
            standLeft: new Sprite({
                img: imageStore.player,
                framesCount: 3,
                position: { x: 0, y: 5 * 64 },
                offset: { x: 64, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
            jumpRight: new Sprite({
                img: imageStore.player,
                framesCount: 1,
                position: { x: 0, y: 6 * 64 },
                offset: { x: 64, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
            jumpLeft: new Sprite({
                img: imageStore.player,
                framesCount: 1,
                position: { x: 0, y: 7 * 64 },
                offset: { x: 64, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
            fallRight: new Sprite({
                img: imageStore.player,
                framesCount: 1,
                position: { x: 64, y: 6 * 64 },
                offset: { x: 64, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
            fallLeft: new Sprite({
                img: imageStore.player,
                framesCount: 1,
                position: { x: 64, y: 7 * 64 },
                offset: { x: 64, y: 0 },
                printOffset: { x: 0, y: 2 },
                dimensions: { width: 64, height: 64 },
                margin: { top: 22, right: 11, bottom: 0, left: 11 }
            }),
        }
        this.sprite = this.sprites.standRight
        this.poweringDown = false

    }

    jump() {
        this.isJumping = true
        this.velocity.y = -22
        playAudio(audioStore.jumpEffect)
    }

    fire() {
        if (this.powers === PLAYER_POWERS.FIREBALL && !this.coolingDown && !this.poweringDown) {
            if (this.direction === 'right') {
                fireballs.push(new FireBall({
                    position: { x: this.position.x + this.dimensions.width - 12, y: this.position.y + this.dimensions.height / 3 },
                    dimensions: { width: 12, height: 12 },
                    velocity: { x: 13, y: 4 },
                    sprites: {
                        fire: new Sprite({
                            img: imageStore.powerUp,
                            framesCount: 7,
                            position: { x: 0, y: 204 },
                            offset: { x: 24, y: 0 },
                            printOffset: { x: 0, y: 0 },
                            dimensions: { width: 12, height: 12 },
                            framesRefreshFrequency: 10,
                        }),
                        explote: new Sprite({
                            img: imageStore.powerUp,
                            framesCount: 7,
                            position: { x: 0, y: 216 },
                            offset: { x: 24, y: 0 },
                            printOffset: { x: 0, y: 0 },
                            dimensions: { width: 12, height: 12 },
                            framesRefreshFrequency: 3,
                        })
                    },
                }))
            } else {
                fireballs.push(new FireBall({
                    position: { x: this.position.x - 6, y: this.position.y + this.dimensions.height / 3 },
                    dimensions: { width: 12, height: 12 },
                    velocity: { x: -13, y: 4 },
                    sprites: {
                        fire: new Sprite({
                            img: imageStore.powerUp,
                            framesCount: 7,
                            position: { x: 0, y: 204 },
                            offset: { x: 24, y: 0 },
                            printOffset: { x: 0, y: 0 },
                            dimensions: { width: 12, height: 12 },
                            framesRefreshFrequency: 10,
                        }),
                        explote: new Sprite({
                            img: imageStore.powerUp,
                            framesCount: 7,
                            position: { x: 0, y: 216 },
                            offset: { x: 24, y: 0 },
                            printOffset: { x: 0, y: 0 },
                            dimensions: { width: 12, height: 12 },
                            framesRefreshFrequency: 3,
                        })
                    },
                }))
            }
            playAudio(audioStore.fireEffect)
            this.coolingDown = true
            setTimeout(() => {
                this.coolingDown = false
            }, 1000)
        }
    }

    update(fps) {
        if (this.isDying) {
            this.velocity.y += (GRAVITY)
            this.position.y += (this.velocity.y)
            this.draw()
        }

        if (!this.isAlive) return

        if (this.hasWon) return

        if (this.isWinning) {
            if (this.position.x < teepeeX + imageStore.teepee.width / 2 - this.dimensions.width / 2) {
                this.velocity.x = 5
            } else {
                this.velocity.x = 0
                effects.push(new Effect({
                    position: { x: teepeeX + imageStore.teepee.width / 2 - (this.dimensions.width / 2), y: 500 - this.dimensions.height },
                    dimensions: { width: this.dimensions.width, height: this.dimensions.height },
                    velocity: { x: 0, y: 0 },
                    run: 'once-and-stay-in-last-frame',
                    applyGravity: false,
                    sprite: new Sprite({
                        img: imageStore.enterTeepee,
                        framesCount: 9,
                        position: { x: 0, y: 0 },
                        offset: { x: 64, y: 0 },
                        printOffset: { x: 0, y: 2 },
                        dimensions: { width: 64, height: 64 },
                        margin: { top: 22, bottom: 0, left: 11, right: 11 },
                        framesRefreshFrequency: 12,
                    })
                }))
                //add front of Teepee as top layer to create illusion of entering the Teepee
                effects.push(new Effect({
                    position: { x: teepeeX, y: 504 - imageStore.teepeeFront.height },
                    dimensions: { width: imageStore.teepeeFront.width, height: imageStore.teepeeFront.height },
                    velocity: { x: 0, y: 0 },
                    run: 'once-and-stay-in-last-frame',
                    applyGravity: false,
                    sprite: new Sprite({
                        img: imageStore.teepeeFront,
                        framesCount: 1,
                        position: { x: 0, y: 0 },
                        offset: { x: 0, y: 0 },
                        printOffset: { x: 0, y: 0 },
                        dimensions: { width: imageStore.teepeeFront.width, height: imageStore.teepeeFront.height },
                        margin: { top: 0, bottom: 0, left: 0, right: 0 },
                        framesRefreshFrequency: 1,
                    })
                }))
                setTimeout(() => {
                    game.applyBonusPointsForTimeLeft()
                }, 2000)
                this.hasWon = true
                return
            }
        }

        switch (true) {
            case this.direction === "right" && this.velocity.x === 0 && this.velocity.y === GRAVITY:
                this.sprite = this.sprites.standRight
                break
            case this.direction === "right" && this.velocity.x !== 0 && this.velocity.y === GRAVITY:
                this.sprite = this.sprites.runRight
                break
            case this.direction === "left" && this.velocity.x === 0 && this.velocity.y === GRAVITY:
                this.sprite = this.sprites.standLeft
                break
            case this.direction === "left" && this.velocity.x !== 0 && this.velocity.y === GRAVITY:
                this.sprite = this.sprites.runLeft
                break
            case this.direction === "right" && this.velocity.y < GRAVITY:
                this.sprite = this.sprites.jumpRight
                break
            case this.direction === "right" && this.velocity.y > GRAVITY:
                this.sprite = this.sprites.fallRight
                break
            case this.direction === "left" && this.velocity.y < GRAVITY:
                this.sprite = this.sprites.jumpLeft
                break
            case this.direction === "left" && this.velocity.y > GRAVITY:
                this.sprite = this.sprites.fallLeft
                break
        }

        this.sprite.nextFrame(fps, speedBooster)

        // resize height if needed
        if (this.dimensions.height < this.resizeDimensions.height) {
            this.dimensions.height += 1
            this.position.y -= 1
        } else if (this.dimensions.height > this.resizeDimensions.height) {
            this.dimensions.height -= 1
            this.position.y += 1
        }

        // resize width if needed
        if (this.dimensions.width < this.resizeDimensions.width) {
            this.dimensions.width += 1
            this.position.x -= 1
        } else if (this.dimensions.width > this.resizeDimensions.width) {
            this.dimensions.width -= 1
            this.position.x += 1
        }

        // check collisions with platforms from top to down
        for (let i = 0; i < platforms.length; i++) {
            const platform = platforms[i]
            if (
                this.velocity.y > 0 &&
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
                this.velocity.y = 0
                this.isJumping = false
                break
            }
        }

        // check collisions with platforms from bottom to top
        for (let i = 0; i < platforms.length; i++) {
            const platform = platforms[i]
            if (
                this.velocity.y < 0 &&
                platform.collisions.vertical &&
                (rectCollision( // head
                    this.position.x + (this.direction === 'right' ? this.dimensions.width / 2 : 0),
                    this.position.y + this.velocity.y,
                    this.dimensions.width / 2,
                    this.dimensions.height / 2,
                    platform.position.x,
                    platform.position.y,
                    platform.dimensions.width,
                    platform.dimensions.height
                ) ||
                    rectCollision( // body
                        this.position.x,
                        this.position.y + this.dimensions.height / 2 + this.velocity.y,
                        this.dimensions.width,
                        this.dimensions.height / 2,
                        platform.position.x,
                        platform.position.y,
                        platform.dimensions.width,
                        platform.dimensions.height
                    ))
            ) {
                if (this.position.y > platform.position.y) {
                    this.position.y = platform.position.y + platform.dimensions.height

                    platform.hitByPlayer(this.powers, 'bottom')
                    if (this.powers !== PLAYER_POWERS.NONE && platform.color === "lightbrown" && !this.poweringDown) {
                        debris.push(new Debris({
                            position: { x: platform.position.x, y: platform.position.y },
                            velocity: { x: -4, y: -20, angle: 0.3 },
                            dimensions: { width: 16, height: 16 },
                            color: "lightbrown"
                        }))
                        debris.push(new Debris({
                            position: { x: platform.position.x + platform.dimensions.width - 16, y: platform.position.y },
                            velocity: { x: 4, y: -20, angle: -0.3 },
                            dimensions: { width: 16, height: 16 },
                            color: "lightbrown"
                        }))
                        debris.push(new Debris({
                            position: { x: platform.position.x, y: platform.position.y + platform.dimensions.height - 16 },
                            velocity: { x: -4, y: -10, angle: 0.3 },
                            dimensions: { width: 16, height: 16 },
                            color: "lightbrown"
                        }))
                        debris.push(new Debris({
                            position: { x: platform.position.x + platform.dimensions.width - 16, y: platform.position.y + platform.dimensions.height - 16 },
                            velocity: { x: 4, y: -10, angle: -0.3 },
                            dimensions: { width: 16, height: 16 },
                            color: "lightbrown"
                        }))
                        game.addPoints({ action: ACTIONS.BREAKBLOCK, position: { x: platform.position.x, y: platform.position.y - 20 }, show: false })
                        platforms.splice(i, 1)
                    }
                }
                this.velocity.y = 0
                break
            }
        }

        this.position.y += (this.velocity.y)
        this.velocity.y += (GRAVITY)

        // check collissions with platforms horizontally
        for (let i = 0; i < platforms.length; i++) {
            const platform = platforms[i]
            if (
                platform.visible &&
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
                this.velocity.x = 0
                break
            }
        }

        // check collissions with monsters
        for (let i = 0; i < monsters.length; i++) {
            const monster = monsters[i]
            if (
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
                if (this.isInvincible) {
                    game.addPoints({ action: ACTIONS.INVINCIBLEMONSTER, position: { x: monster.position.x, y: monster.position.y - 20 } })
                    monster.die(() => monsters.splice(monsters.indexOf(monster), 1))
                }
                else if (this.position.y + this.dimensions.height <
                    monster.position.y + 2 * monster.dimensions.height / 3 &&
                    this.velocity.y > 0
                ) {
                    // Player stomp on top of monster
                    game.addPoints({ action: ACTIONS.STOMPMONSTER, position: { x: monster.position.x, y: monster.position.y - 20 } })
                    monster.stompedByPlayer()
                    this.velocity.y = -10
                }
                else {
                    // Player hit from bottom or side the monster
                    if (monster.collisionByPlayer() === COLLISIONRESULT.TAKEHIT) {
                        if (this.powers === PLAYER_POWERS.NONE && !this.poweringDown)
                            this.die(() => {
                                alert("you lose!")
                                location.reload(false)
                            })
                        else {
                            this.poweringDown = true
                            this.powers = PLAYER_POWERS.NONE
                            this.resizeDimensions = { width: 40, height: 40 }
                            setTimeout(() => { this.poweringDown = false }, 1500)
                        }
                    }
                }
                break
            }
        }

        // check collissions with powerups
        for (let i = 0; i < powerUps.length; i++) {
            const powerUp = powerUps[i]
            if (
                rectCollision(
                    this.position.x + this.velocity.x,
                    this.position.y,
                    this.dimensions.width,
                    this.dimensions.height,
                    powerUp.position.x,
                    powerUp.position.y,
                    powerUp.dimensions.width,
                    powerUp.dimensions.height
                )
            ) {
                switch (powerUp.type) {
                    case PLAYER_POWERS.SUPER:
                        if (this.powers === PLAYER_POWERS.NONE) {
                            this.powers = PLAYER_POWERS.SUPER
                            this.resizeDimensions = { width: 48, height: 48 }
                        }
                        playAudio(audioStore.powerUpAppliedEffect)
                        game.addPoints({ action: ACTIONS.COLLECTPOWERUP, position: { x: this.position.x, y: this.position.y - 20 } })
                        break
                    case PLAYER_POWERS.FIREBALL:
                        if (this.powers === PLAYER_POWERS.NONE || this.powers === PLAYER_POWERS.SUPER) {
                            this.powers = PLAYER_POWERS.FIREBALL
                            this.resizeDimensions = { width: 48, height: 48 }
                        }
                        playAudio(audioStore.powerUpAppliedEffect)
                        game.addPoints({ action: ACTIONS.COLLECTPOWERUP, position: { x: this.position.x, y: this.position.y - 20 } })
                        break
                    case PLAYER_POWERS.INVINCIBLE:
                        //dont play power up effect, just accelerate bacgkround music
                        this.isInvincible = true
                        game.addPoints({ action: ACTIONS.COLLECTPOWERUP, position: { x: this.position.x, y: this.position.y - 20 } })
                        audioStore.backgroundMusic.playbackRate = 1.5
                        setTimeout(() => {
                            audioStore.backgroundMusic.playbackRate = 0.75
                        }, 6500)
                        setTimeout(() => {
                            this.isInvincible = false
                            audioStore.backgroundMusic.playbackRate = 1
                        }, 8000)
                        break
                    case PLAYER_POWERS.ONEUP:
                        game.addPoints({ action: ACTIONS.ONEUP, position: { x: this.position.x, y: this.position.y - 20 } })
                        game.addLives(1)
                        break
                }
                powerUps.splice(i, 1)
                break
            }
        }

        // check move beyond start of map
        if (this.position.x + this.velocity.x < 0) {
            this.velocity.x = 0
        }

        // check move beyond end of map
        if (this.position.x + this.velocity.x + this.dimensions.width > game.map.end) {
            this.velocity.x = 0
        }

        this.position.x += (this.velocity.x)

        this.draw()
    }

    draw() {

        let mode = this.powers
        if (this.isInvincible)
            mode = 'invincible'

        if (this.sprite) {
            if (!this.poweringDown || this.sprite.framesRefreshCount % 4 !== 0)
                this.sprite.draw({
                    position: this.position,
                    dimensions: this.dimensions,
                    offsetMode: this.offsetModes[mode]
                })
        }
    }

    win() {
        this.isWinning = true
    }

    die(cb) {
        audioStore.backgroundMusic.pause()
        audioStore.loseMusic.play()
        this.isAlive = false
        this.isDying = true
        this.velocity.y = -20
        this.dimensions.height = -this.dimensions.height  //invert sprite vertically
        this.sprite = this.sprites.standLeft
        setTimeout(cb, 2000)
    }
}

function createPlatformBlocks({ position, dimensions, color, collisions, blockWidth = undefined, blockHeight = undefined }) {
    const platformBlocks = []
    if (blockWidth == undefined) blockWidth = dimensions.width
    if (blockHeight == undefined) blockHeight = dimensions.height
    let x = 0
    while (x < dimensions.width) {
        let y = 0
        while (y < dimensions.height) {
            platformBlocks.push(new Platform({
                position: { x: position.x + x, y: position.y + y },
                dimensions: { width: blockWidth, height: blockHeight },
                color: color,
                collisions: collisions
            }))
            y += blockHeight
        }
        x += blockWidth
    }

    return platformBlocks

}

const game = new Game()
const player = new Player()
const debris = []
const platforms = [
    new Platform({
        position: { x: 0, y: 500 },
        dimensions: { width: 2500, height: 50 },
        color: "lightgreen",
    }),
    new Platform({
        position: { x: 350, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
        color: 'treat'
    }),
    new Platform({
        position: { x: 650, y: 100 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
        color: 'treat'
    }),
    new Platform({
        position: { x: 550, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
    }),
    new Platform({
        position: { x: 600, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
        color: 'powerup'
    }),
    new Platform({
        position: { x: 650, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
    }),
    new Platform({
        position: { x: 700, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
        color: 'treat'
    }),
    new Platform({
        position: { x: 750, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
    }),

    new Platform({
        position: { x: 900, y: 400 },
        dimensions: { width: 80, height: 100 },
        color: "green",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 1300, y: 370 },
        dimensions: { width: 80, height: 130 },
        color: "green",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 1600, y: 350 },
        dimensions: { width: 80, height: 150 },
        color: "green",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2000, y: 350 },
        dimensions: { width: 80, height: 150 },
        color: "green",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2000 + 7 * 50, y: 300 },
        dimensions: { width: 50, height: 50 },
        color: "1up",
        collisions: { horizontal: true, vertical: true },
        visible: false
    }),
    new Platform({
        position: { x: 2650, y: 500 },
        dimensions: { width: 15 * 50, height: 50 },
        color: "lightgreen",
    }),
    new Platform({
        position: { x: 2950, y: 300 },
        dimensions: { width: 50, height: 50 },
    }),
    new Platform({
        position: { x: 3000, y: 300 },
        dimensions: { width: 50, height: 50 },
        color: 'powerup'
    }),
    new Platform({
        position: { x: 3050, y: 300 },
        dimensions: { width: 50, height: 50 },
    }),
    ...createPlatformBlocks({
        blockWidth: 50,
        position: { x: 3100, y: 100 },
        dimensions: { width: 8 * 50, height: 50 },
    }),
    new Platform({
        position: { x: 2650 + 11 * 50, y: 500 },
        dimensions: { width: 3550, height: 50 },
        color: "lightgreen",
    }),
    ...createPlatformBlocks({
        blockWidth: 50,
        position: { x: 2650 + 20 * 50, y: 100 },
        dimensions: { width: 3 * 50, height: 50 },
    }),
    new Platform({
        position: { x: 2650 + 23 * 50, y: 300 },
        dimensions: { width: 50, height: 50 },
        color: 'multitreat'
    }),
    new Platform({
        position: { x: 2650 + 23 * 50, y: 100 },
        dimensions: { width: 50, height: 50 },
        color: 'treat'
    }),
    new Platform({
        position: { x: 2650 + 28 * 50, y: 300 },
        dimensions: { width: 50, height: 50 },
    }),
    new Platform({
        position: { x: 2650 + 29 * 50, y: 300 },
        dimensions: { width: 50, height: 50 },
        color: 'starhidden'
    }),
    new Platform({
        position: { x: 2650 + 34 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 50 },
        color: 'treat'
    }),
    new Platform({
        position: { x: 2650 + 37 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 50 },
        color: 'treat'
    }),
    ...createPlatformBlocks({
        blockWidth: 50,
        position: { x: 2650 + 37 * 50, y: 100 },
        dimensions: { width: 1 * 50, height: 50 },
        color: 'powerup'
    }),
    new Platform({
        position: { x: 2650 + 40 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 50 },
        color: 'treat'
    }),
    new Platform({
        position: { x: 2650 + 46 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 50 },
    }),
    ...createPlatformBlocks({
        blockWidth: 50,
        position: { x: 2650 + 49 * 50, y: 100 },
        dimensions: { width: 3 * 50, height: 50 },
    }),
    new Platform({
        position: { x: 2650 + 56 * 50, y: 100 },
        dimensions: { width: 50, height: 50 },
    }),
    ...createPlatformBlocks({
        blockWidth: 50,
        position: { x: 2650 + 57 * 50, y: 100 },
        dimensions: { width: 2 * 50, height: 50 },
        color: 'treat'
    }),
    new Platform({
        position: { x: 2650 + 59 * 50, y: 100 },
        dimensions: { width: 50, height: 50 },
    }),
    ...createPlatformBlocks({
        blockWidth: 50,
        position: { x: 2650 + 57 * 50, y: 300 },
        dimensions: { width: 2 * 50, height: 50 },
    }),
    new Platform({
        position: { x: 2650 + 62 * 50, y: 450 },
        dimensions: { width: 1 * 50, height: 1 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 63 * 50, y: 400 },
        dimensions: { width: 1 * 50, height: 2 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 64 * 50, y: 350 },
        dimensions: { width: 1 * 50, height: 3 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 65 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 4 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 68 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 4 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 69 * 50, y: 350 },
        dimensions: { width: 1 * 50, height: 3 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 70 * 50, y: 400 },
        dimensions: { width: 1 * 50, height: 2 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 71 * 50, y: 450 },
        dimensions: { width: 1 * 50, height: 1 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 62 * 50 + 15 * 50, y: 450 },
        dimensions: { width: 1 * 50, height: 1 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 63 * 50 + 15 * 50, y: 400 },
        dimensions: { width: 1 * 50, height: 2 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 64 * 50 + 15 * 50, y: 350 },
        dimensions: { width: 1 * 50, height: 3 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 65 * 50 + 15 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 4 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 66 * 50 + 15 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 4 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 69 * 50 + 15 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 4 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 70 * 50 + 15 * 50, y: 350 },
        dimensions: { width: 1 * 50, height: 3 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 71 * 50 + 15 * 50, y: 400 },
        dimensions: { width: 1 * 50, height: 2 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 69 * 50 + 15 * 50, y: 500 },
        dimensions: { width: 57 * 50, height: 50 },
        color: "lightgreen",
    }),
    new Platform({
        position: { x: 2650 + 72 * 50 + 15 * 50, y: 450 },
        dimensions: { width: 1 * 50, height: 1 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 72 * 50 + 20 * 50, y: 400 },
        dimensions: { width: 80, height: 100 },
        color: "green",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 2650 + 72 * 50 + 25 * 50, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
    }),
    ...createPlatformBlocks({
        blockWidth: 50,
        position: { x: 2650 + 73 * 50 + 25 * 50, y: 300 },
        dimensions: { width: 2 * 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
        color: 'treat'
    }),
    new Platform({
        position: { x: 2650 + 75 * 50 + 25 * 50, y: 300 },
        dimensions: { width: 50, height: 50 },
        collisions: { horizontal: true, vertical: true },
    }),
    new Platform({
        position: { x: 3200 + 96 * 50 + 20, y: 400 },
        dimensions: { width: 80, height: 100 },
        color: "green",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 98 * 50, y: 450 },
        dimensions: { width: 1 * 50, height: 1 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 99 * 50, y: 400 },
        dimensions: { width: 1 * 50, height: 2 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 100 * 50, y: 350 },
        dimensions: { width: 1 * 50, height: 3 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 101 * 50, y: 300 },
        dimensions: { width: 1 * 50, height: 4 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 102 * 50, y: 250 },
        dimensions: { width: 1 * 50, height: 5 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 103 * 50, y: 200 },
        dimensions: { width: 1 * 50, height: 6 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 104 * 50, y: 150 },
        dimensions: { width: 1 * 50, height: 7 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 105 * 50, y: 100 },
        dimensions: { width: 1 * 50, height: 8 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
    new Platform({
        position: { x: 3200 + 106 * 50, y: 100 },
        dimensions: { width: 1 * 50, height: 8 * 50 },
        color: "darkred",
        collisions: { horizontal: true, vertical: false },
    }),
]

const powerUps = []

const fireballs = []

const effects = []

const monsters = [
    new Monster({
        position: { x: 700, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 1400, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 1800, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 1880, y: 439 },
        dimensions: { width: 60, height: 57 },
        activationOffset: 80,
    }),
    new Monster({
        position: { x: 3110, y: 60 - 17 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 3190, y: 60 - 17 },
        dimensions: { width: 60, height: 57 },
        activationOffset: 80,
    }),
    new Monster({
        position: { x: 3900, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 3980, y: 439 },
        dimensions: { width: 60, height: 57 },
        activationOffset: 80,
    }),
    new Monster({
        position: { x: 4400, y: 500 - 64 },
        dimensions: { width: 46, height: 64 },
        color: "cat-with-roomba",
    }),
    new Monster({
        position: { x: 4750, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 4830, y: 439 },
        dimensions: { width: 60, height: 57 },
        activationOffset: 80,
    }),
    new Monster({
        position: { x: 5250, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 5330, y: 439 },
        dimensions: { width: 60, height: 57 },
        activationOffset: 80,
    }),
    new Monster({
        position: { x: 5450, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 5530, y: 439 },
        dimensions: { width: 60, height: 57 },
        activationOffset: 80,
    }),
    new Monster({
        position: { x: 7800, y: 439 },
        dimensions: { width: 60, height: 57 },
    }),
    new Monster({
        position: { x: 7880, y: 439 },
        dimensions: { width: 60, height: 57 },
        activationOffset: 80,
    }),
]
let scrollX = 0
let speedBooster = 1
const backgroundImg = imageStore.background

function playBackgroundMusic() {
    var myAudio = document.createElement("audio")
    myAudio.src = "./audio/background-music.mp3.ogg"
    myAudio.play()
    // myAudio.pause()
}

let lastAnimationFrameTime = Date.now()
let realLastTime = Date.now()

function animate(newTimestamp) {
    canvas.width = 960
    canvas.height = 540

    const expectedFPS = 60

    const now = newTimestamp

    let deltaTime = 1000 / expectedFPS

    if (newTimestamp !== 0)
        deltaTime = now - lastAnimationFrameTime

    lastAnimationFrameTime = newTimestamp

    fps = 1

    const scrollXBackground = (scrollX / 2) % Math.floor(backgroundImg.width / 2)
    ctx.drawImage(
        backgroundImg,
        scrollXBackground,
        0,
        960,
        540,
        0,
        0,
        canvas.width,
        canvas.height
    )
    ctx.drawImage(
        backgroundImg,
        scrollXBackground * 2,
        500,
        960,
        40,
        0,
        500,
        canvas.width,
        40
    )
    ctx.fillStyle =
        "rgba(0,0,0," + Math.round((scrollX / 25000) * 100) / 100 + ")"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    platforms.forEach((platform) => platform.update(fps))
    //Teepee
    teepeeX = game.map.end - canvas.width / 3 - imageStore.teepee.width / 2
    if (teepeeX + imageStore.teepee.width - scrollX > 0 && teepeeX - scrollX < canvas.width) {
        ctx.drawImage(
            imageStore.teepee,
            teepeeX - scrollX,
            504 - imageStore.teepee.height,
            imageStore.teepee.width,
            imageStore.teepee.height)
    }

    powerUps.forEach((powerUp) => powerUp.update(fps))
    player.update(fps)
    fireballs.forEach((fireball) => fireball.update(fps))
    monsters.forEach((monster) => monster.update(fps))
    debris.forEach((debris_one) => debris_one.update(fps))
    effects.forEach((effect) => effect.update(fps))
    game.update()

    //adjust scroll right side
    if (player.position.x - scrollX > canvas.width / 2) {
        scrollX = (player.position.x - canvas.width / 2)
        if (scrollX > game.map.end - canvas.width) scrollX = game.map.end - canvas.width
    }

    //adjust scroll left side
    if (player.position.x - scrollX < canvas.width) {
        scrollX =
            player.position.x - canvas.width / 5 < 0
                ? 0
                : player.position.x - canvas.width / 5
    }

    //check for losing condition
    if (
        (player.position.y + player.dimensions.height / 2 > canvas.height ||
            game.timeLeft === 0) &&
        player.isAlive && !player.isWinning && !player.hasWon
    ) {
        game.finish()
        player.die(() => {
            alert("you lose!")
            location.reload(false)
        })
    }

    //check for winning condition
    if (
        player.position.x > game.map.end - canvas.width &&
        player.isAlive &&
        !player.hasWon &&
        !player.isWinning
    ) {
        game.finish()
        audioStore.winJingle.play()
        audioStore.backgroundMusic.pause()
        //debugger
        game.addPoints({
            action: ACTIONS.FINISHLEVELHEIGHT,
            position: { x: player.position.x, y: Math.max(player.position.y - 20, 100) },
            times: Math.floor((canvas.height - player.position.y) / 5)
        })
        player.win()
    }



    requestAnimationFrame(animate)
}

addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "w":
        case "W":
        case "ArrowUp":
            if (!player.isJumping && (player.velocity.y == GRAVITY || player.velocity.y == GRAVITY)) {
                player.jump()
            }
            break
        case "d":
        case "D":
        case "ArrowRight":
            player.velocity.x = 5 * speedBooster
            player.direction = "right"
            break
        case "a":
        case "A":
        case "ArrowLeft":
            player.velocity.x = -5 * speedBooster
            player.direction = "left"
            break
        case "Control":
            speedBooster = 1.75
            if (player.velocity.x > 0) {
                player.velocity.x = 5 * speedBooster
            } else if (player.velocity.x < 0) {
                player.velocity.x = -5 * speedBooster
            }
            break
        case ' ':
            player.fire()
            break
    }
})

addEventListener("keyup", ({ key }) => {
    switch (key) {
        case "d":
        case "D":
        case "a":
        case "A":
        case "ArrowRight":
        case "ArrowLeft":
            player.velocity.x = 0
            break
        case "Control":
            player.velocity.x = player.velocity.x / speedBooster
            speedBooster = 1
            break
    }
})

btnStart.addEventListener('click', () => startGame())
addEventListener('keypress', ({ key }) => { if (key === 'Enter') startGame() }, { once: true })