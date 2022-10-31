class Background {
    constructor(ctx, width, height) {
        this.ctx = ctx
        this.width = width
        this.height = height

        this.backgroundImg = new Image()
        this.backgroundImg.src = './assets/backgroundMario.png'

        this.vel = 10
    }

    draw() {
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.width, this.height)
    }

    update() {
        this.posX -= this.vel
        if (this.posX < 0 - this.width) this.posX = 0
    }
}