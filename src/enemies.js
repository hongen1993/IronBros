class Enemies {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.floor = 90

        this.width = 40
        this.height = 55

        this.moveLeft = true
        this.moveRight = false
    }

    draw() {
        this.ctx.drawImage(this.kleenexImg, this.posX, this.posY, this.width, this.height)
    }

}

class Kleenex extends Enemies {
    constructor(ctx, ctxWidth, ctxHeight, floor, width, height, moveLeft, moveRight) {
        super(ctx, ctxWidth, ctxHeight, floor, width, height, moveLeft, moveRight)

        this.posX = this.ctxWidth - 250
        this.posY = ctxHeight - this.floor - this.height

        this.kleenexImg = new Image()
        this.kleenexImg.src = "./assets/kleenex-b.png";
    }

    move() {
        if (this.posX > 0 && this.moveLeft === true) {
            this.posX--
        }
        if (this.posX === 0) {
            this.moveLeft = false
            this.moveRight = true
        }
        if (this.posX < this.ctxWidth - this.width && this.moveRight === true) {
            this.posX++
        }
        if (this.posX === this.ctxWidth - this.width) {
            this.moveLeft = true
            this.moveRight = false
        }
    }
}

class KleenexB extends Kleenex {
    constructor(ctx, ctxWidth, ctxHeight, floor, moveLeft, moveRight) {
        super(ctx, ctxWidth, ctxHeight, floor, moveLeft, moveRight)

        this.width = 120
        this.height = 100

        this.posX = this.ctxWidth - 50
        this.posY = ctxHeight - this.floor - this.height

        this.kleenexImg = new Image()
        this.kleenexImg.src = "./assets/bang.png";

    }

    move() {
        if (this.posX > 0 && this.moveLeft === true) {
            console.log(this.posX)
            this.posX -= 2
        }
        if (this.posX === 0 || this.posX === 1) {
            this.moveLeft = false
            this.moveRight = true
        }
        if (this.posX < this.ctxWidth - this.width && this.moveRight === true) {
            this.posX += 2
        }
        if (this.posX === this.ctxWidth - this.width) {
            this.moveLeft = true
            this.moveRight = false
        }
    }
}
