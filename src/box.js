class Box {
    constructor(ctx, ctxWidth, ctxHeight, width = 45, height = 45, posX = 200, posY = 500) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.posX = posX
        this.posY = posY

        this.width = width
        this.height = height
    }

    draw(color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}