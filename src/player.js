class Player {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.floor = 90

        this.width = 50
        this.height = 60

        this.posX = 100
        this.posY = ctxHeight - this.floor - this.height

        this.canJump = false

        this.velX = 0
        this.velY = 0
        this.gravity = 3

        this.keys = {
            leftKeyPressed: false,
            rightKeyPressed: false,
            upKeyPressed: false,
        }

    }

    init() {
        this.setEventListeners()
    }

    draw() {
        this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height)
    }

    moveLeft() {
        if (this.posX > 0) this.posX -= 10
    }

    moveRight() {
        if (this.posX < this.ctxWidth - this.width) this.posX += 10
    }

    jump() {
        if (this.canJump) {
            this.velY -= 35
            this.canJump = false
        }
    }

}


class Shit extends Player {
    constructor(ctx, ctxWidth, ctxHeight, floor, width, height, canJump, posX, posY, velX, velY, gravity, keys) {
        super(ctx, ctxWidth, ctxHeight, floor, width, height, canJump, posX, posY, velX, velY, gravity, keys)

        this.playerImg = new Image()
        this.playerImg.src = "./assets/mrcaquita.png";

        this.init()

    }

    update() {
        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY + this.height + this.velY >= this.ctxHeight - this.floor) {
            this.velY = 0
            this.canJump = true
        }

        if (this.keys.leftKeyPressed) this.moveLeft()
        if (this.keys.rightKeyPressed) this.moveRight()
        if (this.keys.upKeyPressed) this.jump()
        if (this.keys.jumpPressed) this.jump()

        if (this.keys.downKeyPressed) this.moveDown()


    }

    setEventListeners() {
        document.addEventListener('keydown', ({ code }) => {
            switch (code) {
                case 'KeyA':
                    this.keys.leftKeyPressed = true
                    break;
                case 'KeyD':
                    this.keys.rightKeyPressed = true
                    break;
                case 'KeyW':
                    this.keys.upKeyPressed = true
                case 'Space':
                    this.keys.upKeyPressed = true
                    break;
                case 'KeyS':
                    this.height = 30, this.width = 25
                    break;
            }
        })

        document.addEventListener('keyup', ({ code }) => {
            switch (code) {
                case 'KeyA':
                    this.keys.leftKeyPressed = false
                    break;
                case 'KeyD':
                    this.keys.rightKeyPressed = false
                    break;
                case 'KeyW':
                    this.keys.upKeyPressed = false
                    break;
                case 'Space':
                    this.keys.upKeyPressed = false
                    break;
                case 'KeyS':
                    this.width = 50, this.height = 60, this.posY -= 30
                    break;
            }
        })
    }

}

class Fart extends Player {
    constructor(ctx, ctxWidth, ctxHeight, floor, width, height, canJump, posY, velX, velY, keys) {
        super(ctx, ctxWidth, ctxHeight, floor, width, height, canJump, posY, velX, velY, keys)

        this.posX = 200

        this.gravity = 2

        this.playerImg = new Image()
        this.playerImg.src = "./assets/mrpedo.png";

        this.init()

    }

    update() {
        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY + this.height + this.velY >= this.ctxHeight - this.floor) {
            this.velY = 0
            this.canJump = true
        }

        if (this.keys.leftKeyPressed) this.moveLeft()
        if (this.keys.rightKeyPressed) this.moveRight()
        if (this.keys.upKeyPressed) this.jump()
        if (this.keys.jumpPressed) this.jump()

    }

    setEventListeners() {
        document.addEventListener('keydown', ({ code }) => {
            switch (code) {
                case 'ArrowLeft':
                    this.keys.leftKeyPressed = true
                    break;
                case 'ArrowRight':
                    this.keys.rightKeyPressed = true
                    break;
                case 'ArrowUp':
                    this.keys.upKeyPressed = true
                    break;
                case 'ArrowDown':
                    this.height = 30, this.width = 25
                    break;
            }
        })

        document.addEventListener('keyup', ({ code }) => {
            switch (code) {
                case 'ArrowLeft':
                    this.keys.leftKeyPressed = false
                    break;
                case 'ArrowRight':
                    this.keys.rightKeyPressed = false
                    break;
                case 'ArrowUp':
                    this.keys.upKeyPressed = false
                    break;
                case 'ArrowDown':
                    this.width = 50, this.height = 60, this.posY -= 30
                    break;
            }
        })
    }

}