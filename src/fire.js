class Fire {
    constructor(ctx, ctxWidth, ctxHeight, posX, posY, width, height, fireImg) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.posX = posX
        this.posY = posY

        this.width = width
        this.height = height

        this.fireImg = new Image
        this.fireImg.src = fireImg
    }

    draw() {
        this.ctx.drawImage(this.fireImg, this.posX, this.posY, this.width, this.height)

    }
}
