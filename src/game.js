const Game = {
    name: 'Platform Game',
    author: 'Daniel - Tito - Hongen',
    version: '1.0.0',
    description: 'Super Mario Bros was inspirated by our game',

    FPS: 60,

    canvas: undefined,
    ctx: undefined,
    width: 1024,
    height: 576,

    background: undefined,
    defeatImg: undefined,

    lives: [],
    coins: [],
    platforms: [],
    fires: [],
    enemies: [],

    player: undefined,
    playerTwo: undefined,

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

            this.checkCollisions(this.player, this.enemies)
            this.checkPlatformColl(this.player)
            this.checkCoinColl(this.player)

            this.framesCounter++
            if (this.framesCounter % 35 === 0) this.player.cooldown++
            // if (this.framesCounter % 35 === 0) this.playerTwo.cooldown++

            if (this.framesCounter % 100 === 0) this.damageLives(this.player)
            // if (this.framesCounter % 100 === 0) this.damageLives(this.playerTwo)
        }, 1000 / this.FPS)
    },

    generateAll() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.score = new Score(this.ctx, this.width, this.height)

        this.generatePlatforms()
        this.generateFires()
        this.generateEnemies()
        this.generateCoins()
        this.generateLives()

        this.player = new Player(this.ctx, this.width, this.height)
        // this.playerTwo = new PlayerTwo(this.ctx, this.width, this.height)
    },

    drawAll() {
        this.background.draw()

        this.platforms.forEach(platform => platform.draw())
        this.fires.forEach(fire => fire.draw())
        this.enemies.forEach(enemy => enemy.draw())
        this.coins.forEach(coin => coin.draw())

        this.player.update()
        this.playerMovement(this.player)
        this.enemiesMovements()
        this.score.draw()
        this.drawLives()
        // this.playerTwo.update()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    gameOver() {
        clearInterval(this.intervalId)
        this.clearAll()
        setTimeout(() => {
            this.ctx.drawImage(this.defeatImg, 0, 0, this.width, this.height)
        }, 1000)
        setTimeout(() => {
            location.reload()
        }, 5000)
    },

    // PLAYER 

    generateLives() {
        this.lives.push(
            new Heart(this.ctx, this.width, this.height, 30),
            new Heart(this.ctx, this.width, this.height, 75),
            new Heart(this.ctx, this.width, this.height, 120)
        )
    },

    drawLives() {
        switch (this.player.lives) {
            case 3:
                this.lives.forEach(life => life.draw())
                break;
            case 2:
                this.lives[0].draw()
                this.lives[1].draw()
                break;
            case 1:
                this.lives[0].draw()
                break;
            case 0:
                this.gameOver()
                break;
        }
    },

    damageLives(player) {
        if (player.damageReceived > 0 && player.damageReceived <= 90) {
            if (!player.lives <= 0) {
                player.lives--
                player.damageReceived = 0
            }
        }
    },

    playerMovement(player) {
        if (player.keys.dKeyPressed && player.posX < this.width / 2) {
            player.posX += 7
        } else if (player.keys.aKeyPressed && player.posX > 100) {
            player.posX -= 7
        } else {
            player.velX = 0
            if (player.keys.dKeyPressed) {
                this.platforms.forEach(platform => platform.posX -= 7)
                this.fires.forEach(fire => fire.posX -= 7)
                this.background.posX -= 5
                this.coins.forEach(coin => coin.posX -= 7)
                this.enemies.forEach(enemy => enemy.posX -= 7)
            } else if (player.keys.aKeyPressed) {
                this.platforms.forEach(platform => platform.posX += 7)
                this.fires.forEach(fire => fire.posX += 7)
                this.background.posX += 5
                this.coins.forEach(coin => coin.posX += 7)
                this.enemies.forEach(enemy => enemy.posX += 7)
            }
        }
    },

    // PLATFORM 

    generatePlatforms() {
        this.platforms.push(
            //ARRIBA

            new Platform(this.ctx, this.posX, this.posY, 500, 460, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 750, 350, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 1000, 240, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 1300, 140, 400, 70),

            new Platform(this.ctx, this.posX, this.posY, 1900, 160, 50, 35),
            new Platform(this.ctx, this.posX, this.posY, 2100, 135, 50, 35),
            new Platform(this.ctx, this.posX, this.posY, 2300, 165, 50, 35),
            new Platform(this.ctx, this.posX, this.posY, 2500, 140, 50, 35),

            new Platform(this.ctx, this.posX, this.posY, 2700, 250, 1000, 70),
            new Platform(this.ctx, this.posX, this.posY, 3200, 40, 625, 170),
            new Platform(this.ctx, this.posX, this.posY, 3800, 40, 170, 390),
            new Platform(this.ctx, this.posX, this.posY, 3200, 360, 625, 70),

            //ABAJO
            new Platform(this.ctx, this.posX, this.posY, 0, 600, 400, 100),
            new Platform(this.ctx, this.posX, this.posY, 0, 700, 1000, 120),

            new Platform(this.ctx, this.posX, this.posY, 1100, 550, 100, 35),
            new Platform(this.ctx, this.posX, this.posY, 1300, 600, 160, 35),
            new Platform(this.ctx, this.posX, this.posY, 1500, 450, 160, 35),

            new Platform(this.ctx, this.posX, this.posY, 1800, 600, 400, 350),
            new Platform(this.ctx, this.posX, this.posY, 2200, 675, 200, 250),
            new Platform(this.ctx, this.posX, this.posY, 2400, 750, 200, 150),

            new Platform(this.ctx, this.posX, this.posY, 2700, 650, 100, 35),
            new Platform(this.ctx, this.posX, this.posY, 2900, 550, 100, 35),
            new Platform(this.ctx, this.posX, this.posY, 3100, 650, 100, 35),

            new Platform(this.ctx, this.posX, this.posY, 3300, 700, 500, 400),
            new Platform(this.ctx, this.posX, this.posY, 3700, 600, 500, 500),
            new Platform(this.ctx, this.posX, this.posY, 4350, 600, 500, 500),



        )
    },

    checkPlatformColl(player) {
        this.platforms.forEach((platform) => {
            if (player.posY + player.height <= platform.posY &&
                player.posY + player.height + player.velY >= platform.posY &&
                player.posX + player.width >= platform.posX &&
                player.posX <= platform.posX + platform.width) {
                player.velY = 0
                if (player.cooldown >= 1) player.canJump = true
            }
        })
    },
    //FIRES

    generateFires() {
        this.fires.push(
            new Fire(this.ctx, this.posX, this.posY, 840, 720, 1170, 35, "./assets/fire.png"),
            new Fire(this.ctx, this.posX, this.posY, 2210, 720, 1350, 35, "./assets/fire.png"),
            new Fire(this.ctx, this.posX, this.posY, 4200, 690, 150, 50, "./assets/spikes.png"),
        )
    },

    // COINS 

    generateCoins() {
        this.coins.push(
            // ARRIBA
            new Coin(this.ctx, this.width, this.height, 1050, 150),

            new Coin(this.ctx, this.width, this.height, 1375, 75),
            new Coin(this.ctx, this.width, this.height, 1575, 75),

            new Coin(this.ctx, this.width, this.height, 2730, 190),
            new Coin(this.ctx, this.width, this.height, 2795, 190),
            new Coin(this.ctx, this.width, this.height, 2860, 190),
            new Coin(this.ctx, this.width, this.height, 2925, 190),
            new Coin(this.ctx, this.width, this.height, 2990, 190),
            new Coin(this.ctx, this.width, this.height, 3055, 190),
            new Coin(this.ctx, this.width, this.height, 3120, 190),

            new Coin(this.ctx, this.width, this.height, 3705, 215),
            new Coin(this.ctx, this.width, this.height, 3755, 215),
            new Coin(this.ctx, this.width, this.height, 3705, 265),
            new Coin(this.ctx, this.width, this.height, 3755, 265),
            new Coin(this.ctx, this.width, this.height, 3705, 315),
            new Coin(this.ctx, this.width, this.height, 3755, 315),

            //ABAJO
            new Coin(this.ctx, this.width, this.height, 200, 540),
            new Coin(this.ctx, this.width, this.height, 275, 540),
            new Coin(this.ctx, this.width, this.height, 350, 540),

            new Coin(this.ctx, this.width, this.height, 450, 630),
            new Coin(this.ctx, this.width, this.height, 550, 630),
            new Coin(this.ctx, this.width, this.height, 650, 630),
            new Coin(this.ctx, this.width, this.height, 750, 630),
            new Coin(this.ctx, this.width, this.height, 850, 630),
            new Coin(this.ctx, this.width, this.height, 950, 630),

            new Coin(this.ctx, this.width, this.height, 1350, 520),

            new Coin(this.ctx, this.width, this.height, 1830, 540),
            new Coin(this.ctx, this.width, this.height, 1980, 540),
            new Coin(this.ctx, this.width, this.height, 2130, 540),

            new Coin(this.ctx, this.width, this.height, 3400, 625),
            new Coin(this.ctx, this.width, this.height, 3550, 625),

            new Coin(this.ctx, this.width, this.height, 3850, 530),
            new Coin(this.ctx, this.width, this.height, 4050, 530),

            new Coin(this.ctx, this.width, this.height, 4450, 530),
            new Coin(this.ctx, this.width, this.height, 4675, 530),

        )
    },

    checkCoinColl(player) {
        this.coins.forEach((coin, i) => {
            if (player.posX + player.width >= coin.posX && player.posX < coin.posX + coin.width
                && player.posY + player.height + player.velY >= coin.posY && player.posY <= coin.posY + coin.height) {
                this.coins.splice(i, 1)
                this.score.score++
            }
        })
    },

    //ENEMIES

    generateEnemies() {
        this.enemies.push(
            new Enemy(this.ctx, this.width, this.height, 700, 647, 40, 55, "./assets/kleenex-b.png"),
            new Enemy(this.ctx, this.width, this.height, 2200, 500, 120, 100, "./assets/bang.png"),
        )
    },

    enemiesMovements() {
        this.enemies[0].movement(400, 976, 2),
            this.enemies[1].movement(401, 976, 2)
    },

    checkCollisions(player) {
        this.enemies.forEach((enemy) => {
            if (player.posX + player.width >= enemy.posX && player.posX < enemy.posX + enemy.width
                && player.posY + player.height + player.velY >= enemy.posY) player.damageReceived++;
        }
        )
    },
}

//TITO

//class Game {
//    constructor() {
//        this.points = 0
//        this.treats = 0
//        this.lives = 3
//        this.treatsToGetLive = 10
//        this.map = { end: 9550 }
//        this.timeEnd = null
//        this.timeLeft = null
//        this.started = false
//    }
//
//    update() {
//        if (this.started) {
//            const currentTime = Date.now()
//            this.timeLeft = Math.max(Math.ceil((this.timeEnd - currentTime) / 1000), 0)
//
//            if (this.timeLeft <= 15)
//                elTimeLeft.classList.add('out-of-time')
//            else
//                elTimeLeft.classList.remove('out-of-time')
//        }
//        this.draw()
//    }
//
//    start(levelDuration = 90000) {
//        this.started = true
//        this.timeLeft = Math.floor(levelDuration / 1000)
//        this.timeEnd = Date.now() + levelDuration
//    }
//
//    applyBonusPointsForTimeLeft() {
//        if (this.timeLeft > 0) {
//            setTimeout(() => {
//                this.addPoints({ action: ACTIONS.REMAININGSECOND, times: 1, show: false })
//                playAudio(audioStore.whisleEffect)
//                this.timeLeft = Math.floor(this.timeLeft - 1)
//                this.applyBonusPointsForTimeLeft()
//            }, 100)
//        }
//    }
//
//
//    finish() {
//        this.started = false
//    }
//
//    addPoints({ action = ACTIONS.STOMPMONSTER, times = 1, show = true, position = { x: 0, y: 0 } }) {
//        if (show) {
//            if (action === ACTIONS.ONEUP) effects.push(new PointEffect({ position: { x: position.x + 10, y: position.y - 20 }, value: '1UP' }))
//            else effects.push(new PointEffect({ position, value: action.points * times }))
//        }
//        this.points += action.points * times
//    }
//
//    addLives(plusLives) {
//        this.lives += plusLives
//        playAudio(audioStore.oneLiveUpEffect)
//    }
//
//    addTreats(plusTreats) {
//        this.treats += plusTreats
//        playAudio(audioStore.whisleEffect)
//
//        if (this.treats >= this.treatsToGetLive) {
//            this.addLives(Math.floor(this.treats / this.treatsToGetLive))
//            this.treats = this.treats % this.treatsToGetLive
//        }
//    }
//
//    draw() {
//        elTreats.textContent = this.treats
//        elLives.textContent = this.lives
//        elPoints.textContent = this.points
//        const timeMilitarFormat = '' + (10000 + Math.floor(this.timeLeft / 60) * 100 + this.timeLeft % 60)
//        elTimeLeft.textContent = timeMilitarFormat.substring(1, 3) + ":" + timeMilitarFormat.substring(3, 5)
//    }
//}
//
//