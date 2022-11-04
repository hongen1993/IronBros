class Meteor {
    constructor(ctx, bossPosX, bossPosY, bossHeight, velX = -5, posY = bossPosY + bossHeight - this.height - 100) {
        this.ctx = ctx

        this.width = 150
        this.height = 150

        this.posX = bossPosX
        this.posY = posY

        this.velX = velX

        this.meteorImg = new Image()
        this.meteorImg.src = './assets/items/meteor.png'

        this.frames = 0
    }

    update() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.drawImage(
            this.meteorImg,
            200 * this.frames,
            0,
            200,
            216,
            this.posX, this.posY, this.width, this.height)
    }

    animate() {
        this.frames++
        if (this.frames >= 9)
            this.frames = 0;
    }

    move() {
        this.posX += this.velX
    }
}