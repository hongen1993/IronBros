class Player {
    constructor(ctx, ctxWidth, ctxHeight, posX = 100, posY = 300, gravity = 2) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.cooldown = 1

        this.canJump = false
        this.canShoot = false
        this.gun = false
        this.powerExtra = false

        this.width = 50
        this.height = 100

        this.inmune = false
        this.lives = 3

        this.bullets = []

        this.posX = posX
        this.posY = posY

        this.canMoveLeft = true
        this.canMoveRight = true
        this.moveLeft = false
        this.moveRight = true

        this.velX = 0
        this.velY = 0
        this.gravity = gravity

        this.keys = {
            aKeyPressed: false,
            dKeyPressed: false,
            wKeyPressed: false,
            sKeyPressed: false,
            lKeyPressed: false,
            pKeyPressed: false,

        }

        this.playerImgA = new Image()
        this.playerImgA.src = "./assets/characters/playerA.png"

        this.playerImgB = new Image()
        this.playerImgB.src = "./assets/characters/playerB.png"

        this.frames = 0

        this.setEventListeners()
    }

    jump() {
        if (this.canJump) {
            this.velY -= 32
            this.canJump = false
            this.cooldown = 0
        }
    }

    update() {
        this.posY += this.velY
        this.velY += this.gravity

        if (this.cooldown >= 1 && this.gun) this.canShoot = true
        if (this.powerExtra) {
            this.height = 120
            this.width = 60
        }
        if (this.keys.wKeyPressed) this.jump()
        if (this.keys.sKeyPressed) this.height = 30
        if (this.keys.dKeyPressed) {
            this.moveRight = true
            this.moveLeft = false
        }
        if (this.keys.aKeyPressed) {
            this.moveLeft = true
            this.moveRight = false
        }
    }

    draw() {
        if (this.moveRight) {
            this.ctx.drawImage(
                this.playerImgB,
                149 * this.frames,
                0,
                149,
                170,
                this.posX, this.posY, this.width, this.height)
        }
        if (this.moveLeft) {
            this.ctx.drawImage(
                this.playerImgA,
                149 * this.frames,
                0,
                149,
                170,
                this.posX, this.posY, this.width, this.height)
        }
    }

    animate() {
        this.frames++
        if (this.frames >= 6)
            this.frames = 0;
    }

    shoot() {
        if (this.canShoot) {
            this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.height, this.width))
            this.canShoot = false
            this.cooldown = 0
        }
    }

    invincible() {
        if (this.inmune) {
            setTimeout(() => {
                this.inmune = false
            }, 3000)
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', ({ code }) => {
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
                case 'KeyE':
                    this.shoot()
                    break;
                case 'KeyL':
                    this.keys.lKeyPressed = true
                    break;
                case 'KeyP':
                    this.keys.pKeyPressed = true
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
                    if (this.powerExtra) this.height = 130, this.posY -= 120
                    else this.height = 100, this.posY -= 100
                    break;
                case 'KeyL':
                    this.keys.lKeyPressed = false
                    break;
                case 'KeyP':
                    this.keys.pKeyPressed = false
                    break;
            }
        })
    }
}

