class Player {
    // NO NECESITAMOS 3 CLASES. CON UNA ME VALE
    constructor(ctx, ctxWidth, ctxHeight, posX = 100, gravity = 3, playerImg = "./assets/mrcaquita.png") {
        // 
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.floor = 90
        this.cooldown = 1

        this.canJump = false

        this.width = 50
        this.height = 60

        this.damageReceived = 0 //hacer bien las colisiones, esto no haría falta
        this.lives = 3

        this.posX = posX
        this.posY = ctxHeight - this.floor - this.height

        this.velY = 0
        this.gravity = gravity

        this.keys = {
            aKeyPressed: false,
            dKeyPressed: false,
            wKeyPressed: false,
            sKeyPressed: false,
        }

        this.playerImg = new Image()
        this.playerImg.src = playerImg

        this.init()
    }

    init() {
        this.setEventListeners()
    }

    moveLeft() {
        if (this.posX > 100) this.posX -= 10
    }

    moveRight() {
        if (this.posX < 700) this.posX += 10
    }

    jump() {
        if (this.canJump) {
            this.velY -= 35
            this.canJump = false
            this.cooldown = 0
        }
    }

    update() {
        this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height)

        this.posY += this.velY
        this.velY += this.gravity

        if (this.posY + this.height + this.velY >= this.ctxHeight - this.floor) {
            this.velY = 0
            if (this.cooldown >= 1) this.canJump = true
        }

        if (this.keys.aKeyPressed) this.moveLeft()
        if (this.keys.dKeyPressed) this.moveRight()
        if (this.keys.wKeyPressed) this.jump()
        if (this.keys.sKeyPressed) this.height = 30, this.width = 25




    }

    setEventListeners() {
        document.addEventListener('keydown', ({ code }) => {
            // Volver aquí si queréis varios movimientos a la vez
            switch (code) {
                case 'KeyA':
                    this.keys.aKeyPressed = true
                    break;
                case 'KeyD':
                    this.keys.dKeyPressed = true
                    break;
                case 'KeyW':
                    this.keys.wKeyPressed = true
                case 'Space':
                    this.keys.wKeyPressed = true
                    break;
                case 'KeyS':
                    this.keys.sKeyPressed = true
                    break;
            }
        })

        document.addEventListener('keyup', ({ code }) => {
            switch (code) {
                case 'KeyA':
                    this.keys.aKeyPressed = false
                    break;
                case 'KeyD':
                    this.keys.dKeyPressed = false
                    break;
                case 'KeyW':
                    this.keys.wKeyPressed = false
                    break;
                case 'Space':
                    this.keys.wKeyPressed = false
                    break;
                case 'KeyS':
                    this.keys.sKeyPressed = false
                    this.width = 50, this.height = 60, this.posY -= 30
                    break;
            }
        })
    }
}