class Enemy {
    constructor(ctx, ctxWidth, ctxHeight, posX, posY, width, height, velX, enemyImgA, enemyImgB) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = width
        this.height = height

        this.posX = posX
        this.posY = posY
        this.velX = velX

        this.moveLeft = true
        this.moveRight = false

        this.enemyImgA = new Image()
        this.enemyImgA.src = enemyImgA

        this.enemyImgB = new Image()
        this.enemyImgB.src = enemyImgB

        this.frames = 0
    }

    draw() {
        if (this.moveLeft) {
            this.ctx.drawImage(
                this.enemyImgA,
                100 * this.frames,
                0,
                100,
                109,
                this.posX, this.posY, this.width, this.height)
        } else {
            this.ctx.drawImage(
                this.enemyImgB,
                100 * this.frames,
                0,
                100,
                109,
                this.posX, this.posY, this.width, this.height)
        }
    }

    animate() {
        this.frames++
        if (this.frames >= 3)
            this.frames = 0;
    }

    movement(positionA, positionB) {
        if (this.posX >= positionA && this.moveLeft === true) {
            this.posX -= this.velX
        }
        if (this.posX === positionA) {
            this.moveLeft = false
            this.moveRight = true
        }
        if (this.posX <= positionB && this.moveRight === true) {
            this.posX += this.velX
        }
        if (this.posX === positionB) {
            this.moveLeft = true
            this.moveRight = false
        }
    }
}