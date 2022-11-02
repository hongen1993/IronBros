class Score {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 120
        this.height = 150

        this.posX = this.ctxWidth - 150
        this.posY = 55

        this.score = 0
    }

    draw() {
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Score: ${this.score}`, this.posX, this.posY);
    }
}