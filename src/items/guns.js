class Gun {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 100
        this.height = 100

        this.posX = 5220
        this.posY = 300

        this.gunImg = new Image
        this.gunImg.src = "./assets/items/gun.png"
    }

    draw() {
        this.ctx.drawImage(this.gunImg, this.posX, this.posY, this.width, this.height)
    }
}