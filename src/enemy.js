class Enemy {
    constructor(ctx, ctxWidth, ctxHeight, posX, posY, width, height, enemyImg) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = width
        this.height = height

        this.posX = posX
        this.posY = posY

        this.moveLeft = true
        this.moveRight = false

        this.enemyImg = new Image()
        this.enemyImg.src = enemyImg
    }

    draw() {
        this.ctx.drawImage(this.enemyImg, this.posX, this.posY, this.width, this.height)
    }

    movement(positionA, positionB, speed) {
        if (this.posX >= positionA && this.moveLeft === true) {
            console.log(this.posX)
            console.log(this.moveLeft)
            this.posX -= speed
        }
        if (this.posX === positionA) {
            this.moveLeft = false
            this.moveRight = true
        }
        if (this.posX <= positionB && this.moveRight === true) {
            this.posX += speed
        }
        if (this.posX === positionB) {
            this.moveLeft = true
            this.moveRight = false
        }
    }
}

//// TITO
//
//class Monster {
//    position = { x: 30, y: 0 }
//    velocity = { x: 0, y: 0 }
//    dimensions = { width: 40, height: 40 }
//    color = "brown"
//    isJumping = true
//    isAlive = true
//    isDying = false
//    isActivated = false
//    activationOffset = 0
//    direction = "left"
//
//
//    setSprites() {
//        switch (this.color) {
//            case 'cat-with-roomba':
//                this.sprites = {
//                    runRight: new Sprite({
//                        img: imageStore.monsterCatRoomba,
//                        framesCount: 4,
//                        position: { x: 0, y: 64 },
//                        offset: { x: 64, y: 0 },
//                        printOffset: { x: 0, y: 2 },
//                        dimensions: { width: 64, height: 64 },
//                        margin: { top: 0, bottom: 0, right: 9, left: 9 },
//                        framesFrequency: 3,
//                    }),
//                    runLeft: new Sprite({
//                        img: imageStore.monsterCatRoomba,
//                        framesCount: 4,
//                        position: { x: 0, y: 0 },
//                        offset: { x: 64, y: 0 },
//                        printOffset: { x: 0, y: 2 },
//                        dimensions: { width: 64, height: 64 },
//                        margin: { top: 0, bottom: 0, right: 9, left: 9 },
//                        framesFrequency: 3,
//                    })
//                }
//                break
//            case 'cat':
//                this.sprites = {
//                    runRight: new Sprite({
//                        img: imageStore.monsterCatRoomba,
//                        framesCount: 4,
//                        position: { x: 0, y: 64 },
//                        offset: { x: 64, y: 0 },
//                        printOffset: { x: 0, y: 2 },
//                        dimensions: { width: 64, height: 64 - 16 },
//                        margin: { top: 0, bottom: 0, right: 9, left: 9 },
//                        framesFrequency: 3,
//                    }),
//                    runLeft: new Sprite({
//                        img: imageStore.monsterCatRoomba,
//                        framesCount: 4,
//                        position: { x: 0, y: 0 },
//                        offset: { x: 64, y: 0 },
//                        printOffset: { x: 0, y: 2 },
//                        dimensions: { width: 64, height: 64 - 16 },
//                        margin: { top: 0, bottom: 0, right: 9, left: 9 },
//                        framesFrequency: 3,
//                    })
//                }
//                break
//            default:
//                this.sprites = {
//                    runRight: new Sprite({
//                        img: imageStore.monsterKokoa,
//                        framesCount: 4,
//                        position: { x: 24, y: 160 },
//                        offset: { x: 128, y: 0 },
//                        printOffset: { x: 0, y: 4 },
//                        dimensions: { width: 92, height: 86 },
//                        framesFrequency: 3,
//                    }),
//                    runLeft: new Sprite({
//                        img: imageStore.monsterKokoa,
//                        framesCount: 4,
//                        position: { x: 14, y: 416 },
//                        offset: { x: 128, y: 0 },
//                        printOffset: { x: 0, y: 4 },
//                        dimensions: { width: 92, height: 86 },
//                        framesFrequency: 3,
//                    })
//                }
//        }
//
//        this.sprite = this.sprites.runLeft
//
//    }
//
//    constructor({
//        position,
//        dimensions,
//        color = "brown",
//        velocity = { x: -3, y: 0 },
//        activationOffset = 0,
//    }) {
//        this.position = position
//        this.dimensions = dimensions
//        this.velocity = velocity
//        this.color = color
//        this.activationOffset = activationOffset
//        this.stomped = false
//        this.setSprites()
//
//    }
//
//    update(fps) {
//        if (this.isDying) {
//
//            if (!this.stomped) {
//                this.position.y += (this.velocity.y)
//                this.velocity.y += (GRAVITY)
//            }
//
//            this.draw()
//        }
//
//        if (!this.isAlive) return
//
//        // if monster is not activated, check if it is entering screen
//        if (!this.isActivated) {
//            if (this.position.x - this.activationOffset < scrollX + canvas.width) {
//                this.isActivated = true
//            }
//        }
//
//        if (!this.isActivated) return
//
//        switch (true) {
//            case this.velocity.x > 0:
//                this.sprite = this.sprites.runRight
//                break
//            case this.velocity.x < 0:
//                this.sprite = this.sprites.runLeft
//                break
//        }
//
//        this.sprite.nextFrame(fps, 1)
//
//        // check collisions with platforms from top to down
//        for (let i = 0; i < platforms.length; i++) {
//            const platform = platforms[i]
//            if (
//                platform.visible &&
//                this.position.y + this.dimensions.height <= platform.position.y &&
//                this.position.y + this.dimensions.height + this.velocity.y >=
//                platform.position.y &&
//                this.position.x + this.velocity.x <
//                platform.position.x + platform.dimensions.width &&
//                this.position.x + this.dimensions.width + this.velocity.x >
//                platform.position.x
//            ) {
//                this.position.y = platform.position.y - this.dimensions.height
//                this.velocity.y = 0
//                this.isJumping = false
//                break
//            }
//        }
//
//        // check collisions with platforms from bottom to top
//        for (let i = 0; i < platforms.length; i++) {
//            const platform = platforms[i]
//            if (
//                platform.collisions.vertical &&
//                rectCollision(
//                    this.position.x,
//                    this.position.y + this.velocity.y,
//                    this.dimensions.width,
//                    this.dimensions.height,
//                    platform.position.x,
//                    platform.position.y,
//                    platform.dimensions.width,
//                    platform.dimensions.height
//                )
//            ) {
//                if (this.position.y > platform.position.y) {
//                    this.position.y = platform.position.y + platform.dimensions.height
//                    //hit platform from bottom
//                    //to manage here what to do with hit platforms,
//                    //for instance delete them with explosion animation: platforms.splice(i,1)
//                }
//                this.velocity.y = 0
//                break
//            }
//        }
//
//        this.position.y += (this.velocity.y)
//        this.velocity.y += (GRAVITY)
//
//        // check collissions with platforms horizontally
//        for (let i = 0; i < platforms.length; i++) {
//            const platform = platforms[i]
//            if (
//                platform.collisions.horizontal &&
//                rectCollision(
//                    this.position.x + this.velocity.x,
//                    this.position.y,
//                    this.dimensions.width,
//                    this.dimensions.height,
//                    platform.position.x,
//                    platform.position.y,
//                    platform.dimensions.width,
//                    platform.dimensions.height
//                )
//            ) {
//                this.velocity.x = -this.velocity.x
//                break
//            }
//        }
//
//        // check move beyond start of map
//        if (this.position.x + this.velocity.x < 0) {
//            this.velocity.x = -this.velocity.x
//        }
//
//        this.position.x += (this.velocity.x)
//
//        this.draw()
//    }
//
//    draw() {
//        //draw only if it is in canvas window
//        if (
//            this.position.x + this.dimensions.width - scrollX > 0 &&
//            this.position.x - scrollX < canvas.width
//        ) {
//            if (!this.sprite) {
//                ctx.fillStyle = this.color
//                ctx.fillRect(
//                    this.position.x - scrollX,
//                    this.position.y,
//                    this.dimensions.width,
//                    this.dimensions.height
//                )
//            } else {
//                this.sprite.draw({
//                    position: this.position,
//                    dimensions: this.dimensions,
//                })
//            }
//        }
//    }
//
//    stompedByPlayer() {
//        this.die(() => monsters.splice(monsters.indexOf(this), 1), true)
//        return COLLISIONRESULT.NOHIT
//    }
//
//    collisionByPlayer() {
//        return COLLISIONRESULT.TAKEHIT
//    }
//
//    die(cb, stomped = false) {
//        playAudio(audioStore.monsterStompEffect)
//        this.isAlive = false
//        this.isDying = true
//        this.stomped = stomped
//
//        if (this.color === "cat-with-roomba") {
//            if (this.stomped) {
//                this.dimensions.height = this.dimensions.height - 16 //remove roomba height
//                this.color = "cat"
//                this.setSprites()
//                // add the roomba as new monster
//                monsters.push(new MonsterRoomba({
//                    position: { x: this.position.x, y: this.position.y + this.dimensions.height - 16 },
//                    dimensions: { width: this.dimensions.width, height: 16 },
//                    velocity: { x: 0, y: 0 },
//                    color: 'roomba'
//                }))
//
//            }
//            this.stomped = false
//            this.velocity.y = -10 //make the monster jump and later fall
//            this.dimensions.height = -this.dimensions.height  //invert sprite vertically
//            setTimeout(cb, 2000)
//            return
//        }
//
//
//        if (stomped && this.color === 'brown') {
//            this.position.x -= 5
//            this.dimensions.width += 10
//            this.position.y = this.position.y + this.dimensions.height - 10
//            this.dimensions.height = 10
//            setTimeout(cb, 250)
//        } else {
//            this.stomped = false
//            this.velocity.y = -10 //make the monster jump and later fall
//            this.dimensions.height = -this.dimensions.height  //invert sprite vertically
//            setTimeout(cb, 2000)
//        }
//    }
//
//}
//
//class MonsterRoomba extends Monster {
//    setSprites() {
//        this.sprites = {
//            runRight: new Sprite({
//                img: imageStore.monsterCatRoomba,
//                framesCount: 4,
//                position: { x: 0, y: 64 + 49 },
//                offset: { x: 64, y: 0 },
//                printOffset: { x: 0, y: 2 },
//                dimensions: { width: 64, height: 16 },
//                margin: { top: 0, bottom: 0, right: 9, left: 9 },
//                framesFrequency: 3,
//            }),
//            runLeft: new Sprite({
//                img: imageStore.monsterCatRoomba,
//                framesCount: 4,
//                position: { x: 0, y: 0 + 49 },
//                offset: { x: 64, y: 0 },
//                printOffset: { x: 0, y: 2 },
//                dimensions: { width: 64, height: 16 },
//                margin: { top: 0, bottom: 0, right: 9, left: 9 },
//                framesFrequency: 3,
//            })
//        }
//        this.sprite = this.sprites.runLeft
//    }
//
//    update(fps) {
//        super.update(fps)
//
//        //check collision with other monsters
//        for (let i = 0; i < monsters.length; i++) {
//            const monster = monsters[i]
//            // if monster is close to become visible
//            if (monster.position.x + monster.dimensions.width - scrollX > - canvas.width / 3 &&
//                monster.position.x - scrollX < canvas.width + canvas.width / 3)
//                if (
//                    monster !== this &&
//                    monster.isAlive &&
//                    rectCollision(
//                        this.position.x + this.velocity.x,
//                        this.position.y,
//                        this.dimensions.width,
//                        this.dimensions.height,
//                        monster.position.x,
//                        monster.position.y,
//                        monster.dimensions.width,
//                        monster.dimensions.height
//                    )
//                ) {
//                    game.addPoints({ action: ACTIONS.ROOMBAMONSTER, position: { x: monster.position.x, y: monster.position.y - 20 } })
//                    monster.die(() => monsters.splice(monsters.indexOf(monster), 1))
//                }
//        }
//
//    }
//
//    draw() {
//        super.draw()
//    }
//
//    stompedByPlayer() {
//        if (this.velocity.x !== 0) {
//            this.velocity.x = 0
//            game.addPoints({ action: ACTIONS.STOMPMONSTER, position: { x: this.position.x, y: this.position.y - 20 } })
//        } else {
//            if (player.position.x + player.dimensions.width / 2 < this.position.x + this.dimensions.width / 2)
//                this.velocity.x = 10
//            else
//                this.velocity.x = -10
//            game.addPoints({ action: ACTIONS.KICKROOMBA, position: { x: this.position.x, y: this.position.y - 20 } })
//        }
//        return COLLISIONRESULT.NOHIT
//    }
//
//    collisionByPlayer() {
//        if (this.velocity.x !== 0)
//            return COLLISIONRESULT.TAKEHIT
//
//        if (player.position.x + player.dimensions.width / 2 < this.position.x + this.dimensions.width / 2)
//            this.velocity.x = 10
//        else
//            this.velocity.x = -10
//        game.addPoints({ action: ACTIONS.KICKROOMBA, position: { x: this.position.x, y: this.position.y - 20 } })
//        return COLLISIONRESULT.NOHIT
//
//    }
//
//    die(cb, stomped = false) {
//        playAudio(audioStore.monsterStompEffect)
//        this.isAlive = false
//        this.isDying = true
//        this.stomped = false
//        this.velocity.y = -10 //make the monster jump and later fall
//        this.dimensions.height = -this.dimensions.height  //invert sprite vertically
//        setTimeout(cb, 2000)
//    }
//
//}