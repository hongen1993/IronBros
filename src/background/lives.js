class Heart {
    constructor(ctx, ctxWidth, ctxHeight, posX, posY) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 40
        this.height = 40

        this.posX = posX
        this.posY = posY

        this.livesImg = new Image
        this.livesImg.src = "./assets/items/heart.png"
    }

    draw() {
        this.ctx.drawImage(this.livesImg, this.posX, this.posY, this.width, this.height)
    }
}