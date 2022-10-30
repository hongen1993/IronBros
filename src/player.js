class Player {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.floor = 50

        this.canJump = false

        this.width = 100
        this.height = 130

        this.posX = 100
        this.posY = ctxHeight - 50 - this.height

        this.velX = 0
        this.velY = 0
        this.gravity = 2

        this.keys = {
            leftKeyPressed: false,
            rightKeyPressed: false,
            upKeyPressed: false,
        }

        this.playerImg = new Image()
        this.playerImg.src = "./assets/mrcaquita.png";

        this.setEventListeners()
    }

    draw() {
        this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height)
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
                case 'Space':
                    this.keys.upKeyPressed = true
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
                case 'Space':
                    this.keys.upKeyPressed = false
                    break;
            }

        })

    }

    moveLeft() {
        if (this.posX > 0) this.posX -= 20
    }

    moveRight() {
        if (this.posX < this.ctxWidth - this.width) this.posX += 20
    }

    jump() {
        if (this.canJump) {
            this.velY -= 30
            this.canJump = false
        }
    }

}

