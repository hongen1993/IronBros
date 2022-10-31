class Platform {
    constructor(ctx, ctxWidth, ctxHeight, width = 200, height = 45, posX = 300, posY = 500) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.posX = posX
        this.posY = posY

        this.width = width
        this.height = height
    }

    draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}