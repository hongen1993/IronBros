class Player {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 100
        this.height = 130

        this.posX = 100
        this.posY = ctxHeight - 50 - this.height

        this.playerImg = new Image()
        this.playerImg.src = "./assets/mrcaquita.png";

        this.setEventListeners()
    }

    draw() {
        this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height)
    }

    setEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    if (this.posX > 0) this.posX -= 15
                    break;
                case 'ArrowRight':
                    if (this.posX < this.ctxWidth - this.width) this.posX += 15
                    break;
                case 'ArrowUp':
                    if (this.posY > 0) this.posY -= 15
                    break;
                case 'ArrowDown':
                    if (this.posY < this.ctxHeight - this.height) this.posY += 15
                    break;
                case 'Space':
                    if (this.posY < this.ctxHeight - this.height) this.posY += 15
                    break;
            }

        })

    }

}