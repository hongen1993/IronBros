class Heart {
    constructor(ctx, ctxWidth, ctxHeight, posX = 30) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 40
        this.height = 40

        this.posX = posX
        this.posY = 30

        this.livesImg = new Image
        this.livesImg.src = "./assets/heart.png"
    }

    draw() {
        this.ctx.drawImage(this.livesImg, this.posX, this.posY, this.width, this.height)
    }
}