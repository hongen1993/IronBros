class Platform {
    constructor(ctx, ctxWidth, ctxHeight, posX, posY, width, height) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.posX = posX
        this.posY = posY

        this.width = width
        this.height = height

        this.platformImg = new Image
        this.platformImg.src = './assets/background/ground.png'
    }

    draw() {
        this.ctx.drawImage(this.platformImg, this.posX, this.posY, this.width, this.height)
    }
}

