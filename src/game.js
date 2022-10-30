<<<<<<< HEAD
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

    score: 0,
    intervalId: undefined,
    framesCounter: 0,

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

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
            this.framesCounter++
            if (this.framesCounter % 60 === 0) this.score.score++
            this.clearAll()
            this.drawAll()
        }, 1000 / this.FPS)
    },
    drawAll() {
        this.background.draw()
        this.shit.draw()
        this.shit.update()
        this.fart.draw()
        this.fart.update()
        this.score.draw()
    },

    generateAll() {
        this.shit = new Shit(this.ctx, this.width, this.height)
        this.fart = new Fart(this.ctx, this.width, this.height)
        this.background = new Background(this.ctx, this.width, this.height)
        this.score = new Score(this.ctx, this.width, this.height)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

}

=======
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

    score: 0,
    intervalId: undefined,
    framesCounter: 0,

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

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
            this.framesCounter++
            if (this.framesCounter % 60 === 0) this.score.score++
            this.clearAll()
            this.drawAll()
        }, 1000 / this.FPS)
    },
    drawAll() {
        this.background.draw()
        this.shit.draw()
        this.shit.update()
        this.fart.draw()
        this.fart.update()
        this.score.draw()
    },

    generateAll() {
        this.shit = new Shit(this.ctx, this.width, this.height)
        this.fart = new Fart(this.ctx, this.width, this.height)
        this.background = new Background(this.ctx, this.width, this.height)
        this.score = new Score(this.ctx, this.width, this.height)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

}

>>>>>>> 1b6631afc12c0719b4d9622939ef7582b3158364
