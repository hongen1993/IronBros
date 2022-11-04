class Spaceship {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 200
        this.height = 300

        this.posX = 7200
        this.posY = 300

        this.spaceShipImg = new Image
        this.spaceShipImg.src = "./assets/background/spaceShip.png"

        this.frames = 0
    }

    draw() {
        this.ctx.drawImage(
            this.spaceShipImg,
            250 * this.frames,
            0,
            250,
            156,
            this.posX, this.posY, this.width, this.height)
    }
    animate() {
        this.frames++
        if (this.frames >= 5)
            this.frames = 0;
    }
}