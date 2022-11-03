class Boss {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.lives = 15
        this.meteors = []

        this.width = 250
        this.height = 700

        this.posX = 5600
        this.posY = 400

        //this.bossImg = new Image()
        //this.bossImg.src = ...
    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}