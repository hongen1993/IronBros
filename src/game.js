const Game = {
    name: 'Platform Game',
    author: 'Daniel - Tito - Hongen',
    version: '1.0.0',
    description: 'Super Mario Bros was inspirated by our game',

    FPS: 60,

    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,

    player: undefined,
    playerTwo: undefined,
    background: undefined,
    defeatImg: undefined,

    score: 0,
    intervalId: undefined,
    framesCounter: 0,

    damageReceived: 0,

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.defeatImg = new Image()
        this.defeatImg.src = './assets/gameOver.jpg'

        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.canvas.width = this.width
        this.canvas.height = this.height
    },

    start() {
        this.generateAll()

        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.checkCollisions()
            this.framesCounter++
            if (this.framesCounter % 35 === 0) this.shit.cooldown++
            if (this.framesCounter % 35 === 0) this.fart.cooldown++
            if (this.framesCounter % 100 === 0) this.damageLives()
            if (this.framesCounter % 60 === 0) this.score.score++

        }, 1000 / this.FPS)
    },

    drawAll() {
        this.background.draw()
        this.score.draw()

        this.shit.draw()
        this.shit.update()
        this.fart.draw()
        this.fart.update()

        this.kleenex.draw()
        this.kleenex.move()
        this.cillitBang.draw()
        this.cillitBang.move()
    },

    generateAll() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.score = new Score(this.ctx, this.width, this.height)

        this.shit = new Shit(this.ctx, this.width, this.height)
        this.fart = new Fart(this.ctx, this.width, this.height)

        this.kleenex = new Kleenex(this.ctx, this.width, this.height)
        this.cillitBang = new cillitBang(this.ctx, this.width, this.height)

    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    checkCollisions() {
        if (this.shit.posX + this.shit.width >= this.kleenex.posX && this.shit.posX < this.kleenex.posX + this.kleenex.width
            && this.shit.posY + this.shit.height + this.shit.velY >= this.kleenex.posY) return this.damageReceived++;
        else {
            console.log(this.damageReceived)
        }
    },

    damageLives() {
        if (this.damageReceived > 0 && this.damageReceived <= 90) {
            if (this.shit.lives <= 0) {
                this.gameOver()
            } else {
                console.log(this.shit.lives)
                this.shit.lives--
                this.damageReceived = 0
            }

        }
    },

    gameOver() {
        clearInterval(this.intervalId)
        this.clearAll()
        this.ctx.drawImage(this.defeatImg, 0, 0, this.width, this.height)
    }
}

