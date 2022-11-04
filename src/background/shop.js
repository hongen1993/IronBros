class Shop {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 350
        this.height = 250

        this.posX = 3700
        this.posY = 430

        this.shopImg = new Image
        this.shopImg.src = "./assets/background/shop.png"
    }

    draw() {
        this.ctx.drawImage(this.shopImg, this.posX, this.posY, this.width, this.height)
    }
}