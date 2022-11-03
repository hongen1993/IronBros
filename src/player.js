class Player {
    constructor(ctx, ctxWidth, ctxHeight, posX = 100, posY = 300, gravity = 2) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.cooldown = 1

        this.canJump = false
        this.canShoot = false
        this.gun = false

        this.width = 50
        this.height = 60

        this.damageReceived = 0 //hacer bien las colisiones, esto no haría falta
        this.lives = 3

        this.bullets = []

        this.posX = posX
        this.posY = posY

        this.velX = 0
        this.velY = 0
        this.gravity = gravity

        this.keys = {
            aKeyPressed: false,
            dKeyPressed: false,
            wKeyPressed: false,
            sKeyPressed: false,
        }

        //this.playerImg = new Image()
        //this.playerImg.src = playerImg

        this.setEventListeners()
    }

    jump() {
        if (this.canJump) {
            this.velY -= 35
            this.canJump = false
            this.cooldown = 0
        }
    }

    update() {
        // this.ctx.drawImage(this.playerImg, this.posX, this.posY, this.width, this.height)
        // this.posX += this.velX
        this.posY += this.velY
        this.velY += this.gravity

        if (this.cooldown >= 1 && this.gun) this.canShoot = true

        if (this.keys.wKeyPressed) this.jump()
        if (this.keys.sKeyPressed) this.height = 30, this.width = 25
    }

    draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)

    }

    shoot() {
        if (this.canShoot) {
            this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.height, this.width))
            this.canShoot = false
            this.cooldown = 0
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', ({ code }) => {
            // Volver aquí si queréis varios movimientos a la vez
            switch (code) {
                // VARIABLES SEGÚN LAS TECLAS DE CADA JUGADOR
                // NECESITO ASOCIAR TECLAS ESPECÍFICAS PARA CADA JUGADOR --> valores que paso por el constructor
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

