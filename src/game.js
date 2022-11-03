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
    enemies: [],
    gun: undefined,

    leftColl: false,
    rightColl: false,
    player: undefined,
    playerTwo: undefined,

    intervalId: undefined,
    framesCounter: 0,

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.winImg = new Image()
        this.winImg.src = './assets/victory.png'

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

            this.checkLavaColl(this.player)
            this.checkCollisions(this.player, this.enemies)
            this.checkBulletsColl(this.player)
            this.checkPlatformColl(this.player)
            this.checkCoinColl(this.player)
            this.checkGunColl(this.player)

            this.framesCounter++
            if (this.framesCounter % 35 === 0) this.player.cooldown++
            // if (this.framesCounter % 35 === 0) this.playerTwo.cooldown++

            if (this.framesCounter % 60 === 0) this.damageLives(this.player)
            // if (this.framesCounter % 100 === 0) this.damageLives(this.playerTwo)

            if (this.framesCounter % 120 === 0) {
                this.boss.meteors.push(new Meteor(this.ctx, this.boss.posX, this.boss.posY, this.boss.height))
            }

            if (this.framesCounter % 180 === 0) {
                this.boss.meteors.push(new Meteor(this.ctx, this.boss.posX, this.boss.posY, this.boss.height))
            }
        }, 1000 / this.FPS)
    },

    generateAll() {
        this.background = new Background(this.ctx, this.width, this.height)
        this.score = new Score(this.ctx, this.width, this.height)

        this.generatePlatforms()
        this.generateEnemies()
        this.generateCoins()
        this.generateLives()

        this.gun = new Gun(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.width, this.height)
        this.boss = new Boss(this.ctx, this.width, this.height)
        // this.playerTwo = new PlayerTwo(this.ctx, this.width, this.height)
    },

    drawAll() {
        this.background.draw()
        this.boss.draw()
        this.boss.meteors.forEach(meteor => meteor.update())
        this.player.draw()
        this.gun.draw()

        this.platforms.forEach(platform => platform.draw())
        this.enemies.forEach(enemy => enemy.draw())
        this.coins.forEach(coin => coin.draw())
        this.player.bullets.forEach(bullet => bullet.draw())

        this.player.update()
        this.enemiesMovements(this.platforms)
        this.playerMovement(this.player)
        this.score.draw()
        this.drawLives()
        // this.playerTwo.update()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.clearBullets()
        this.clearMeteors()
    },

    clearBullets() {
        this.player.bullets.forEach((bullet, i, bullets) => {
            if (bullet.posX + bullet.width - 150 > this.boss.posX) {
                bullets.splice(i, 1)
            }
        })
    },

    clearMeteors() {
        this.boss.meteors = this.boss.meteors.filter(meteor => meteor.posX > this.platforms[13].posX)
    },

    winGame() {
        clearInterval(this.interval)
        this.clearAll()

        this.ctx.drawImage(this.winImg, 0, 0, this.width, this.height)

        setTimeout(() => {
            location.reload()
        }, 2000)
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
                console.log(player.damageReceived)
                player.lives--
                player.damageReceived = 0
            }
        }
    },

    checkGunColl(player) {
        if (player.posX + player.width >= this.gun.posX && player.posX < this.gun.posX + this.gun.width
            && player.posY + player.height + player.velY >= this.gun.posY && player.posY <= this.gun.posY + this.gun.height) {
            this.gun.width = 0
            this.gun.height = 0
            this.gun.posY = 0
            player.gun = true
        }
    },

    playerMovement(player) {
        if (player.keys.dKeyPressed && !this.rightColl) {
            if (player.posX < this.width / 2) player.posX += 5
            this.platforms.forEach(platform => platform.posX -= 5)
            this.background.posX -= 3
            this.coins.forEach(coin => coin.posX -= 5)
            this.enemies.forEach(enemy => enemy.posX -= 5)
            this.boss.posX -= 5
            this.gun.posX -= 5
        }
        // if (player.keys.dKeyPressed && player.posX + player.width === Math.floor(this.width / 2)) {
        //     console.log(player.posX + player.width)
        //     console.log(Math.floor(this.width / 2))
        //     player.posX += 5
        // } else {
        //     player.posX += 5
        // }
        if (player.keys.aKeyPressed && !this.leftColl) {
            if (player.posX > 100) player.posX -= 5
            this.platforms.forEach(platform => platform.posX += 5)
            this.background.posX += 3
            this.coins.forEach(coin => coin.posX += 5)
            this.enemies.forEach(enemy => enemy.posX += 5)
            this.boss.posX += 5
            this.gun.posX += 5
        }
    },
    checkPlatformColl(player) {
        this.platforms.forEach((platform) => {
            // TENGO QUE TENER EN CUENTA LA COLISIÓN DE MI CABEZA CON LA PARTE INFERIOR DE LA PLATAFORMA
            // TAMBIÉN TENGO QUE TENER EN CUENTA LAS POSIBLES COLISIONES EN EL EJE X --> velX = 0 // FLAG, BOOLEANO QUE ME IMPIDA DESPLAZAR LATERALMENTE
            if (player.posY + player.height <= platform.posY &&
                player.posY + player.height + player.velY >= platform.posY &&
                player.posX + player.width >= platform.posX &&
                player.posX <= platform.posX + platform.width) {
                player.velY = 0
                if (player.cooldown >= 1) player.canJump = true
            }
            if (player.posX >= platform.posX + platform.width &&
                player.posY + player.height > platform.posY &&
                player.posY < platform.posY + platform.height) {
                this.leftColl = true
            } if (player.posX > platform.posX + platform.width + 5) this.leftColl = false

            if (player.posX + player.width === platform.posX &&
                player.posY + player.height >= platform.posY &&
                player.posY <= platform.posY + platform.height) {
                this.rightColl = true
            } if (player.posX > platform.posX + platform.width - 5) this.rightColl = false

        })
    },
    // PLATFORM 

    generatePlatforms() {
        this.platforms.push(

            //ABAJO

            new Platform(this.ctx, this.posX, this.posY, 0, 600, 400, 220),
            new Platform(this.ctx, this.posX, this.posY, 400, 700, 600, 120),

            new Platform(this.ctx, this.posX, this.posY, 1100, 550, 100, 35),
            new Platform(this.ctx, this.posX, this.posY, 1300, 600, 160, 35),
            new Platform(this.ctx, this.posX, this.posY, 1500, 450, 160, 35),

            new Platform(this.ctx, this.posX, this.posY, 1800, 600, 400, 350),
            new Platform(this.ctx, this.posX, this.posY, 2200, 675, 200, 250),
            new Platform(this.ctx, this.posX, this.posY, 2400, 750, 200, 150),

            new Platform(this.ctx, this.posX, this.posY, 2700, 650, 100, 35),
            new Platform(this.ctx, this.posX, this.posY, 2900, 550, 100, 35),
            new Platform(this.ctx, this.posX, this.posY, 3100, 650, 100, 35),

            new Platform(this.ctx, this.posX, this.posY, 3300, 700, 400, 400),
            new Platform(this.ctx, this.posX, this.posY, 3700, 600, 500, 500),
            new Platform(this.ctx, this.posX, this.posY, 4350, 600, 750, 500),
            new Platform(this.ctx, this.posX, this.posY, 5500, 600, 1500, 500),

            //ARRIBA

            new Platform(this.ctx, this.posX, this.posY, 500, 460, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 750, 350, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 1000, 240, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 1300, 140, 400, 70),

            new Platform(this.ctx, this.posX, this.posY, 1875, 160, 75, 35),
            new Platform(this.ctx, this.posX, this.posY, 2075, 135, 75, 35),
            new Platform(this.ctx, this.posX, this.posY, 2275, 165, 75, 35),
            new Platform(this.ctx, this.posX, this.posY, 2475, 140, 75, 35),

            new Platform(this.ctx, this.posX, this.posY, 2700, 250, 1000, 70),
            new Platform(this.ctx, this.posX, this.posY, 3200, 40, 625, 170),
            new Platform(this.ctx, this.posX, this.posY, 3800, 40, 170, 390),
            new Platform(this.ctx, this.posX, this.posY, 3200, 360, 625, 70),

        )
    },

    checkLavaColl(player) {
        if (player.posY + player.height + player.velY >= this.height) {
            if (this.player.posY > this.height) {
                // this.gameOver()
            }
            if (this.player.cooldown >= 1) this.canJump = true
        }
    },

    // COINS 

    generateCoins() {
        this.coins.push(

            //ABAJO 0-18

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

            // ARRIBA 0-16

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
            new Enemy(this.ctx, this.width, this.height, 900, 620, 100, 100, 2, "./assets/enemyA.png", "./assets/enemyB.png"),
            new Enemy(this.ctx, this.width, this.height, 2100, 495, 100, 125, .75, "./assets/enemy2A.png", "./assets/enemy2B.png"),
            new Enemy(this.ctx, this.width, this.height, 1500, 40, 120, 100, 2, "./assets/bird.png", "./assets/birdB.png"),
            new Enemy(this.ctx, this.width, this.height, 2600, 200, 120, 100, 3, "./assets/bird.png", "./assets/birdB.png"),

        )
    },

    enemiesMovements(platforms) {
        this.enemies[0].movement(platforms[1].posX, platforms[1].posX + platforms[1].width - 100),
            this.enemies[1].movement(platforms[5].posX, platforms[5].posX + platforms[5].width - 100),
            this.enemies[2].movement(platforms[0].posX - 500, platforms[9].posX - 300),
            this.enemies[3].movement(platforms[0].posX - 500, platforms[9].posX - 300)
    },

    checkCollisions(player) {
        this.enemies.forEach((enemy) => {
            if (enemy.posX + enemy.width + enemy.velX >= player.posX &&
                enemy.posX + enemy.width <= player.posX &&
                player.posY + player.height + player.velY >= enemy.posY
                && player.posY <= enemy.posY + enemy.height) {
                player.posY -= 125
                player.width = 30, player.height = 25
                setTimeout(() => {
                    player.posY -= 125
                    player.width = 50, player.height = 60, player.posY -= 30
                }, 300)
                setTimeout(() => {
                    player.posY -= 125

                    player.width = 30, player.height = 25
                }, 600)
                setTimeout(() => {
                    player.posY -= 125
                    player.width = 50, player.height = 60, player.pos -= 30
                }, 900)
                player.lives--
            }
        }
        )
        console.log(player.lives)
    },

    checkBulletsColl(player) {
        this.player.bullets.forEach(bullet => {
            if (bullet.posX + bullet.width + bullet.velX >= this.boss.posX
                && bullet.posX + bullet.width <= this.boss.posX) {
                this.boss.lives--
                console.log(this.boss.lives)
                if (this.boss.lives <= 0) this.winGame()
            }
        })

        this.boss.meteors.forEach(meteor => {
            if (this.player.posX + this.player.width - 100 >= meteor.posX && this.player.posX <= meteor.posX + meteor.width
                && this.player.posY + this.player.height + this.player.velY >= meteor.posY) player.damageReceived++
        })
    }
}

