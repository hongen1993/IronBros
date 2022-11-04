class Spaceship {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 400
        this.height = 300

        this.posX = 7100
        this.posY = 260

        this.victoryFlag = new Image
        this.victoryFlag.src = "./assets/background/victoryFlag.png"

        this.frames = 0
    }

    draw() {
        this.ctx.drawImage(this.victoryFlag, this.posX, this.posY, this.width, this.height)

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