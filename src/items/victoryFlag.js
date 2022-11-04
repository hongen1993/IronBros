class VictoryFlag {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 100
        this.height = 200

        this.posX = 7200
        this.posY = 350

        this.victoryFlagImg = new Image
        this.victoryFlagImg.src = "./assets/items/victoryFlag.png"
    }

    draw() {
        this.ctx.drawImage(this.victoryFlagImg, this.posX, this.posY, this.width, this.height)
    }
}