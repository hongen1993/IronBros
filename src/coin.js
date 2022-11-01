class Coin {
    constructor(ctx, ctxWidth, ctxHeight, posX = 375, posY = 350) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 40
        this.height = 40

        this.posX = posX
        this.posY = posY

        this.coinsImg = new Image
        this.coinsImg.src = "./assets/coin.png"
    }

    draw() {
        this.ctx.drawImage(this.coinsImg, this.posX, this.posY, this.width, this.height)
    }
}