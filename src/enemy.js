class Enemy {
    constructor(ctx, ctxWidth, ctxHeight, width = 40, height = 55, posX = ctxWidth - 250, enemyImg = "./assets/kleenex-b.png") {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.floor = 115

        this.width = width
        this.height = height

        this.posX = posX
        this.posY = ctxHeight - this.floor - this.height

        this.moveLeft = true
        this.moveRight = false

        this.enemyImg = new Image()
        this.enemyImg.src = enemyImg
    }

    move() {
        this.ctx.drawImage(this.enemyImg, this.posX, this.posY, this.width, this.height)

        if (this.posX > 0 && this.moveLeft === true) {
            this.posX--
        }
        if (this.posX === 0) {
            this.moveLeft = false
            this.moveRight = true
        }
        if (this.posX < this.ctxWidth - this.width && this.moveRight === true) {
            this.posX++
        }
        if (this.posX === this.ctxWidth - this.width) {
            this.moveLeft = true
            this.moveRight = false
        }
    }
}