class Background {
    constructor(ctx) {
        this.ctx = ctx

        this.backgroundImg = new Image()
        this.backgroundImg.src = './assets/background/background.jpg'

        this.posX = -200
        this.posY = -250
    }

    draw() {
        this.ctx.drawImage(this.backgroundImg, this.posX, this.posY)
    }
}