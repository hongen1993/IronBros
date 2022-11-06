class Boss {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.lives = 15
        this.meteors = []

        this.width = 250
        this.height = 500

        this.posX = 6250
        this.posY = 150

        this.bossImg = new Image()
        this.bossImg.src = "./assets/characters/boss.png"

        this.frames = 0
    }

    draw() {
        this.ctx.drawImage(
            this.bossImg,
            250 * this.frames,
            0,
            250,
            300,
            this.posX, this.posY, this.width, this.height)
    }

    animate() {
        this.frames++
        if (this.frames >= 6)
            this.frames = 0;
    }

    movement(positionA) {
        if (this.posX >= positionA) {
            this.posX -= 10
        }
    }
}