class Platform {
    constructor(ctx, ctxWidth, ctxHeight, posX, posY, width, height, platformImg) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.posX = posX
        this.posY = posY

        this.width = width
        this.height = height

        // this.platformImg = new Image
        // this.platformImg.src = platformImg
    }

    draw() {
        // this.ctx.drawImage(this.platformImg, this.posX, this.posY, this.width, this.height)
        this.ctx.fillStyle = '#492A15'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}

