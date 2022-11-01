class PlayerTwo {
    constructor(ctx, ctxWidth, ctxHeight) {
        // 
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.floor = 115
        this.cooldown = 1

        this.canJump = false

        this.width = 50
        this.height = 60

        this.damageReceived = 0 //hacer bien las colisiones, esto no haría falta
        this.lives = 300

        this.posX = 100
        this.posY = ctxHeight - this.floor - this.height

        this.velY = 0
        this.gravity = 3

        this.keys = {
            leftKeyPressed: false,
            rightKeyPressed: false,
            upKeyPressed: false,
            downKeyPressed: false,
        }

        this.playerTwoImg = new Image()
        this.playerTwoImg.src = "./assets/mrpedo.png"

        this.init()
    }

    init() {
        this.setEventListeners()
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
            this.cooldown = 0
        }
    }

    update() {
        this.ctx.drawImage(this.playerTwoImg, this.posX, this.posY, this.width, this.height)

        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY + this.height + this.velY >= this.ctxHeight - this.floor) {
            this.velY = 0
            if (this.cooldown >= 1) this.canJump = true
        }

        if (this.keys.leftKeyPressed) this.moveLeft()
        if (this.keys.rightKeyPressed) this.moveRight()
        if (this.keys.upKeyPressed) this.jump()
        if (this.keys.downKeyPressed) this.height = 30, this.width = 25
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
                    this.keys.downKeyPressed = true
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
                    this.keys.downKeyPressed = false
                    this.width = 50, this.height = 60, this.posY -= 30
                    break;
            }
        })
    }
}
