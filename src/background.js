class Background {
    constructor(ctx, Width, Height) {
        this.ctx = ctx
        this.width = Width
        this.height = Height

        this.backgroundImg = new Image()
        this.backgroundImg.src = './assets/background.jpg'
    }

    draw() {
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.width, this.height)
    }
}