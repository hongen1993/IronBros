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

    background: undefined,
    defeatImg: undefined,
    score: 0,
    platform: undefined,
    box: undefined,
    player: undefined,
    playerTwo: undefined,
    enemy: undefined,
    enemyB: undefined,

    intervalId: undefined,
    framesCounter: 0,

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

            this.checkCollisions(this.player, this.enemy)
            this.checkCollisions(this.playerTwo, this.enemy)

            this.checkPlatformColl(this.player, this.platform)
            this.checkPlatformColl(this.playerTwo, this.platform)

            // this.checkBoxColl(this.player, this.box)

            this.framesCounter++
            if (this.framesCounter % 35 === 0) this.player.cooldown++
            if (this.framesCounter % 35 === 0) this.playerTwo.cooldown++

            if (this.framesCounter % 100 === 0) this.damageLives(this.player)
            if (this.framesCounter % 100 === 0) this.damageLives(this.playerTwo)

            if (this.framesCounter % 60 === 0) this.score.score++

        }, 1000 / this.FPS)
    },

    drawAll() {
        this.background.draw()
        this.score.draw()
        this.lifeA.draw()
        this.lifeB.draw()
        this.lifeC.draw()


        this.platform.draw()
        this.box.draw('yellow')

        this.player.update()
        this.playerTwo.update()

        this.enemy.move()
        this.enemyB.move()
    },

    generateAll() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.score = new Score(this.ctx, this.width, this.height)
        this.lifeA = new Heart(this.ctx, this.width, this.height)
        this.lifeB = new Heart(this.ctx, this.width, this.height, 75)
        this.lifeC = new Heart(this.ctx, this.width, this.height, 120)

        this.platform = new Platform(this.ctx, this.width, this.height)
        this.box = new Box(this.ctx, this.width, this.height)


        this.player = new Player(this.ctx, this.width, this.height)
        this.playerTwo = new PlayerTwo(this.ctx, this.width, this.height)

        this.enemy = new Enemy(this.ctx, this.width, this.height)
        this.enemyB = new Enemy(this.ctx, this.width, this.height, 120, 100, 800, "./assets/bang.png")
    },

    checkCollisions(player, enemy) {
        if (player.posX + player.width >= enemy.posX && player.posX < enemy.posX + enemy.width
            && player.posY + player.height + player.velY >= enemy.posY) player.damageReceived++;
    },

    checkPlatformColl(player, platform) {
        if (player.posY + player.height <= platform.posY &&
            player.posY + player.height + player.velY >= platform.posY &&
            player.posX + player.width >= platform.posX &&
            player.posX <= platform.posX + platform.width) {
            player.velY = 0
            if (player.cooldown >= 1) player.canJump = true

        }
    },

    // BOX
    // checkBoxColl(player, box) {
    //     if (player.posX + player.width >= box.posX && player.posX < box.posX + box.width &&
    //         player.posY > box.posY + box.height) {
    //         if (player.posX + player.width >= box.posX && player.posX < box.posX + box.width &&
    //             player.posY - 30 >= box.posY + box.height) {
    //             this.box.height = 75, this.box.width = 75, this.box.posX = 185, this.box.posY = 485

    //             if (player.posY + player.height <= box.posY &&
    //                 player.posY + player.height + player.velY >= box.posY &&
    //                 player.posX + player.width >= box.posX &&
    //                 player.posX <= box.posX + box.width) {
    //                 player.velY = 0
    //                 if (player.cooldown >= 1) player.canJump = true
    //             }
    //         }
    //         console.log(this.player.gravity)
    //         this.player.gravity = 20

    //     } else {
    //         this.player.gravity = 3
    //     }
    // },

    damageLives(player) {
        if (player.damageReceived > 0 && player.damageReceived <= 90) {
            if (player.lives <= 0) {
                this.gameOver()
            } else {
                player.lives--
                player.damageReceived = 0
            }
        }
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    gameOver() {
        clearInterval(this.intervalId)
        this.clearAll()
        this.ctx.drawImage(this.defeatImg, 0, 0, this.width, this.height)
        setTimeout(() => {
            location.reload()
        }, 5000)
    }
}

