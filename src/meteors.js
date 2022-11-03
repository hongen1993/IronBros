class Meteor {
    constructor(ctx, bossPosX, bossPosY = bossPosY + bossHeight - this.height - 50, bossHeight, velX = -10) {
        this.ctx = ctx

        this.width = 100
        this.height = 100

        this.posX = bossPosX
        this.posY = bossPosY

        this.velX = velX

        this.meteorImg = new Image()
        this.meteorImg.src = './assets/meteor.png'
    }

    update() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.drawImage(this.meteorImg, this.posX, this.posY, this.width, this.height)
    }

    move() {
        this.posX += this.velX
    }
}