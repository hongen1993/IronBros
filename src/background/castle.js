class Spaceship {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 600
        this.height = 600

        this.posX = 6900
        this.posY = 0

        this.castle = new Image
        this.castle.src = "./assets/background/castle.png"

        this.frames = 0
    }

    draw() {
        this.ctx.drawImage(this.castle, this.posX, this.posY, this.width, this.height)

        // this.ctx.drawImage(
        //     this.spaceShipImg,
        //     250 * this.frames,
        //     0,
        //     250,
        //     156,
        //     this.posX, this.posY, this.width, this.height)
    }
    // animate() {
    //     this.frames++
    //     if (this.frames >= 5)
    //         this.frames = 0;
    // }
}