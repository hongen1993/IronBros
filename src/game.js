const Game = {
    name: 'Platform Game',
    author: 'Daniel - Tito - Hongen',
    version: '1.0.0',
    description: 'Super Mario Bros was inspired by our game',

    FPS: 60,

    canvas: undefined,
    ctx: undefined,
    width: 1024,
    height: 576,

    background: undefined,
    canStart: true,
    winImg: undefined,

    lifeEatA: false,
    lifeEatB: false,

    lives: [],
    coins: [],
    platforms: [],
    enemies: [],
    gun: undefined,
    shop: undefined,
    spaceship: undefined,

    player: undefined,
    playerTwo: undefined,

    intervalId: undefined,
    framesCounter: 0,

    init() {
        this.canvas = document.querySelector('#canvas')
        this.ctx = this.canvas.getContext('2d')

        this.winImg = new Image()
        this.winImg.src = './assets/background/victory.png'
        this.defeatImg = new Image()
        this.defeatImg.src = './assets/background/defeatImg.png'

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

            this.shopColl(this.player)
            this.spaceshipColl(this.player)
            this.checkFall(this.player)
            this.checkCollisions(this.player, this.enemies)
            this.checkBulletsColl(this.player)
            this.checkPlatformColl(this.player)
            this.checkCoinColl(this.player)
            this.checkGunColl(this.player)
            this.checkLivesColl(this.player)
            this.framesCounter++
            this.bulletPower()
            // if (this.framesCounter % 35 === 0) this.playerTwo.cooldown++

            if (this.player.gun) {
                if (this.framesCounter % 15 === 0) {
                    this.boss.animate();
                }

                if (this.framesCounter % 580 === 0) {
                    this.boss.meteors.push(new Meteor(this.ctx, this.boss.posX, this.boss.posY, this.boss.height, -13, this.boss.posY + this.boss.height - 260))
                }
                if (this.framesCounter % 190 === 0) {
                    this.boss.meteors.push(new Meteor(this.ctx, this.boss.posX, this.boss.posY, this.boss.height, -9, this.boss.posY + this.boss.height - 340))
                }
                if (this.framesCounter % 410 === 0) {
                    this.boss.meteors.push(new Meteor(this.ctx, this.boss.posX, this.boss.posY, this.boss.height, -12, this.boss.posY + this.boss.height - 420))
                }
            }

            if (this.framesCounter % 30 === 0) {
                this.spaceship.animate();
            }

            if (this.framesCounter % 15 === 0) {
                this.enemies.forEach(enemy => {
                    enemy.animate();
                });
            }

            if (this.framesCounter % 15 === 0) {
                this.boss.meteors.forEach(meteor => {
                    meteor.animate();
                });
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

        this.shop = new Shop(this.ctx, this.width, this.height)
        this.spaceship = new Spaceship(this.ctx, this.width, this.height)
        this.gun = new Gun(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.width, this.height)
        this.boss = new Boss(this.ctx, this.width, this.height)
        // this.playerTwo = new PlayerTwo(this.ctx, this.width, this.height)
    },

    drawAll() {
        this.background.draw()
        this.gun.draw()

        this.platforms.forEach(platform => platform.draw())
        this.enemies.forEach(enemy => enemy.draw())
        this.coins.forEach(coin => coin.draw())
        this.player.bullets.forEach(bullet => bullet.draw())
        this.boss.meteors.forEach(meteor => meteor.update())

        this.spaceship.draw()
        this.shop.draw()
        this.boss.draw()
        this.player.update()
        this.enemiesMovements(this.platforms)
        this.player.draw()
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
        this.boss.meteors = this.boss.meteors.filter(meteor => meteor.posX > this.platforms[13].posX - 100)
    },

    winGame() {
        clearInterval(this.intervalId)
        this.clearAll()
        this.ctx.drawImage(this.winImg, 0, 0, this.width, this.height)
        setTimeout(() => {
            location.reload()
        }, 5000)
    },

    gameOver() {
        clearInterval(this.intervalId)
        this.clearAll()
        this.ctx.drawImage(this.defeatImg, 0, 0, this.width, this.height)
        setTimeout(() => {
            location.reload()
        }, 5000)
    },

    generateLives() {
        this.lives.push(
            new Heart(this.ctx, this.width, this.height, 30, 30),
            new Heart(this.ctx, this.width, this.height, 75, 30),
            new Heart(this.ctx, this.width, this.height, 120, 30),
            new Heart(this.ctx, this.width, this.height, 2000, 50),
            new Heart(this.ctx, this.width, this.height, 2375, 50)
        )
    },

    checkLivesColl(player) {
        if (player.posX + player.width >= this.lives[3].posX && player.posX < this.lives[3].posX + this.lives[3].width
            && player.posY + player.height + player.velY >= this.lives[3].posY && player.posY <= this.lives[3].posY + this.lives[3].height) {
            switch (player.lives) {
                case 3:
                    this.lives[3].posX = 165
                    this.lives[3].posY = 30
                    this.lifeEatA = true
                    player.lives++
                    break;
                case 2:
                    this.lives[3].posX = 120
                    this.lives[3].posY = 30
                    this.lifeEatA = true
                    player.lives++
                    break;
                case 1:
                    this.lives[3].posX = 75
                    this.lives[3].posY = 30
                    this.lifeEatA = true
                    player.lives++
                    break;
            }
        }
        if (player.posX + player.width >= this.lives[4].posX && player.posX < this.lives[4].posX + this.lives[4].width
            && player.posY + player.height + player.velY >= this.lives[4].posY && player.posY <= this.lives[4].posY + this.lives[4].height) {
            switch (player.lives) {
                case 4:
                    this.lives[4].posX = 210
                    this.lives[4].posY = 30
                    this.lifeEatB = true
                    player.lives++

                    break;
                case 3:
                    this.lives[4].posX = 165
                    this.lives[4].posY = 30
                    this.lifeEatB = true
                    player.lives++

                    break;
                case 2:
                    this.lives[4].posX = 120
                    this.lives[4].posY = 30
                    this.lifeEatB = true
                    player.lives++

                    break;
                case 1:
                    this.lives[4].posX = 75
                    this.lives[4].posY = 30
                    this.lifeEatB = true
                    break;
            }
        }
    },

    drawLives() {
        switch (this.player.lives) {
            case 5:
                this.lives.forEach(life => life.draw())
                break;
            case 4:
                if (!this.lifeEatB) {
                    this.lives[4].draw()
                }
                this.lives[0].draw()
                this.lives[1].draw()
                this.lives[2].draw()
                this.lives[3].draw()
                this.lives[4].draw()
                break;
            case 3:
                if (!this.lifeEatA) {
                    this.lives[3].draw()
                }
                if (!this.lifeEatB) {
                    this.lives[4].draw()
                }
                this.lives[0].draw()
                this.lives[1].draw()
                this.lives[2].draw()
                break;
            case 2:
                if (!this.lifeEatA) {
                    this.lives[3].draw()
                }
                if (!this.lifeEatB) {
                    this.lives[4].draw()
                }
                this.lives[0].draw()
                this.lives[1].draw()
                break;
            case 1:
                if (!this.lifeEatA) {
                    this.lives[3].draw()
                }
                if (!this.lifeEatB) {
                    this.lives[4].draw()
                }
                this.lives[0].draw()
                break;
            case 0:
                this.gameOver()
                break;
        }
    },

    checkGunColl(player) {
        if (player.posX + player.width >= this.gun.posX && player.posX < this.gun.posX + this.gun.width
            && player.posY + player.height + player.velY >= this.gun.posY && player.posY <= this.gun.posY + this.gun.height) {
            this.gun.width = 0
            this.gun.height = 0
            this.gun.posY = 0
            player.gun = true
            if (player.gun) {
                this.platforms[12].posY += 200
                this.platforms[11].posY += 200
            }
        }
    },

    playerMovement(player) {
        if (player.keys.dKeyPressed && player.canMoveRight) {
            if (player.posX < this.width / 2) player.posX += 6
            this.platforms.forEach(platform => platform.posX -= 5)
            this.background.posX -= 4
            this.coins.forEach(coin => coin.posX -= 5)
            this.enemies.forEach(enemy => enemy.posX -= 5)
            this.boss.posX -= 5
            this.gun.posX -= 5
            this.spaceship.posX -= 5
            this.shop.posX -= 5
            if (this.framesCounter % 5 === 0) player.animate()
            if (!this.lifeEatA) {
                this.lives[3].posX -= 5
            }
            if (!this.lifeEatB) {
                this.lives[4].posX -= 5
            }
        }
        if (player.keys.aKeyPressed && player.canMoveLeft) {
            if (player.posX > 100) {
                player.posX -= 6
                this.platforms.forEach(platform => platform.posX += 5)
                this.background.posX += 4
                this.coins.forEach(coin => coin.posX += 5)
                this.enemies.forEach(enemy => enemy.posX += 5)
                this.boss.posX += 5
                this.gun.posX += 5
                this.spaceship.posX += 5
                this.shop.posX += 5
                if (this.framesCounter % 5 === 0) player.animate()
                if (!this.lifeEatA) {
                    this.lives[3].posX += 5
                }
                if (!this.lifeEatB) {
                    this.lives[4].posX += 5
                }
            }
        }
    },

    checkPlatformColl(player) {
        this.platforms.forEach(platform => {
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
                player.canMoveLeft = false
            } if (player.posX > platform.posX + platform.width + 7) player.canMoveLeft = true

            if (player.posX + player.width <= platform.posX &&
                player.posY + player.height >= platform.posY &&
                player.posY <= platform.posY + platform.height) {
                player.canMoveRight = false
            } if (player.posX + player.width < platform.posX - 7) player.canMoveRight = true
        })
    },

    generatePlatforms() {
        this.platforms.push(

            new Platform(this.ctx, this.posX, this.posY, 50, 600, 250, 50),
            new Platform(this.ctx, this.posX, this.posY, 400, 700, 600, 120),

            new Platform(this.ctx, this.posX, this.posY, 1100, 550, 100, 35),
            new Platform(this.ctx, this.posX, this.posY, 1300, 600, 160, 35),
            new Platform(this.ctx, this.posX, this.posY, 1550, 450, 130, 35),

            new Platform(this.ctx, this.posX, this.posY, 1750, 650, 400, 200),
            new Platform(this.ctx, this.posX, this.posY, 2250, 700, 300, 120),

            new Platform(this.ctx, this.posX, this.posY, 2650, 625, 200, 50),
            new Platform(this.ctx, this.posX, this.posY, 2950, 650, 130, 40),
            new Platform(this.ctx, this.posX, this.posY, 3200, 700, 100, 30),

            new Platform(this.ctx, this.posX, this.posY, 3450, 675, 800, 250),
            new Platform(this.ctx, this.posX, this.posY, 4350, 650, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 4650, 600, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 4900, 550, 750, 300),
            new Platform(this.ctx, this.posX, this.posY, 6000, 550, 1500, 300),
            new Platform(this.ctx, this.posX, this.posY, 5725, 900, 200, 50),
            new Platform(this.ctx, this.posX, this.posY, 5225, 400, 100, 35),

            //--------------------------------------------------------------//

            new Platform(this.ctx, this.posX, this.posY, 500, 460, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 750, 350, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 1000, 240, 150, 35),
            new Platform(this.ctx, this.posX, this.posY, 1300, 140, 400, 70),

            new Platform(this.ctx, this.posX, this.posY, 1875, 160, 75, 35),
            new Platform(this.ctx, this.posX, this.posY, 2075, 135, 75, 35),
            new Platform(this.ctx, this.posX, this.posY, 2275, 165, 75, 35),
            new Platform(this.ctx, this.posX, this.posY, 2475, 140, 75, 35),

            new Platform(this.ctx, this.posX, this.posY, 2700, 250, 1000, 70),
            new Platform(this.ctx, this.posX, this.posY, 3900, 110, 1000, 90),
            new Platform(this.ctx, this.posX, this.posY, 3825, 110, 170, 320),
            new Platform(this.ctx, this.posX, this.posY, 3450, 360, 375, 70),

        )
    },

    checkFall(player) {
        if (player.posY + player.height + player.velY >= this.height) {
            if (this.player.posY > this.height) {
                // this.gameOver()
            }
            if (this.player.cooldown >= 1) this.canJump = true
        }
    },

    generateCoins() {
        this.coins.push(

            new Coin(this.ctx, this.width, this.height, 200, 540),
            new Coin(this.ctx, this.width, this.height, 275, 540),
            new Coin(this.ctx, this.width, this.height, 350, 540),

            new Coin(this.ctx, this.width, this.height, 450, 630),
            new Coin(this.ctx, this.width, this.height, 550, 630),
            new Coin(this.ctx, this.width, this.height, 650, 630),
            new Coin(this.ctx, this.width, this.height, 750, 630),
            new Coin(this.ctx, this.width, this.height, 850, 630),
            new Coin(this.ctx, this.width, this.height, 950, 630),

            new Coin(this.ctx, this.width, this.height, 1360, 530),

            new Coin(this.ctx, this.width, this.height, 1780, 585),
            new Coin(this.ctx, this.width, this.height, 1930, 585),
            new Coin(this.ctx, this.width, this.height, 2080, 585),

            new Coin(this.ctx, this.width, this.height, 3525, 610),
            new Coin(this.ctx, this.width, this.height, 3725, 610),
            new Coin(this.ctx, this.width, this.height, 3925, 610),
            new Coin(this.ctx, this.width, this.height, 4125, 610),

            new Coin(this.ctx, this.width, this.height, 4405, 580),
            new Coin(this.ctx, this.width, this.height, 4710, 530),

            //---------------------------------------------------//

            new Coin(this.ctx, this.width, this.height, 1050, 170),

            new Coin(this.ctx, this.width, this.height, 1375, 75),
            new Coin(this.ctx, this.width, this.height, 1575, 75),

            new Coin(this.ctx, this.width, this.height, 2730, 190),
            new Coin(this.ctx, this.width, this.height, 2795, 190),
            new Coin(this.ctx, this.width, this.height, 2860, 190),
            new Coin(this.ctx, this.width, this.height, 2925, 190),
            new Coin(this.ctx, this.width, this.height, 2990, 190),
            new Coin(this.ctx, this.width, this.height, 3055, 190),
            new Coin(this.ctx, this.width, this.height, 3120, 190),

            new Coin(this.ctx, this.width, this.height, 3185, 190),
            new Coin(this.ctx, this.width, this.height, 3250, 190),
            new Coin(this.ctx, this.width, this.height, 3315, 190),
            new Coin(this.ctx, this.width, this.height, 3380, 190),
            new Coin(this.ctx, this.width, this.height, 3445, 190),
            new Coin(this.ctx, this.width, this.height, 3510, 190),
            new Coin(this.ctx, this.width, this.height, 3575, 190),
            new Coin(this.ctx, this.width, this.height, 3640, 190),

            new Coin(this.ctx, this.width, this.height, 3710, 190),
            new Coin(this.ctx, this.width, this.height, 3770, 190),
            new Coin(this.ctx, this.width, this.height, 3710, 250),
            new Coin(this.ctx, this.width, this.height, 3770, 250),
            new Coin(this.ctx, this.width, this.height, 3710, 310),
            new Coin(this.ctx, this.width, this.height, 3770, 310),
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

    generateEnemies() {
        this.enemies.push(
            new Enemy(this.ctx, this.width, this.height, 900, 650, 100, 100, 2, "./assets/characters/spiderA.png", "./assets/characters/spiderB.png"),
            new Enemy(this.ctx, this.width, this.height, 2100, 530, 100, 125, 1, "./assets/characters/skeletonA.png", "./assets/characters/skeletonB.png"),
            new Enemy(this.ctx, this.width, this.height, 1500, 30, 120, 100, 2, "./assets/characters/birdA.png", "./assets/characters/birdB.png"),
            new Enemy(this.ctx, this.width, this.height, 3600, 150, 120, 100, 1.5, "./assets/characters/birdA.png", "./assets/characters/birdB.png"),
            new Enemy(this.ctx, this.width, this.height, -100, 255, 120, 100, 2, "./assets/characters/birdA.png", "./assets/characters/birdB.png"),
            new Enemy(this.ctx, this.width, this.height, -490, 360, 120, 100, 5, "./assets/characters/birdA.png", "./assets/characters/birdB.png"),
        )
    },

    enemiesMovements(platforms) {
        this.enemies[0].movement(platforms[1].posX, platforms[1].posX + platforms[1].width - 100),
            this.enemies[1].movement(platforms[5].posX, platforms[5].posX + platforms[5].width - 100),
            this.enemies[2].movement(platforms[0].posX - 500, platforms[9].posX - 300),
            this.enemies[3].movement(platforms[0].posX - 500, platforms[9].posX - 300),
            this.enemies[4].movement(platforms[0].posX - 500, platforms[9].posX - 300),
            this.enemies[5].movement(platforms[0].posX - 500, platforms[9].posX)
    },

    checkCollisions(player) {
        this.enemies.forEach(enemy => {
            if (player.posX + player.width >= enemy.posX && player.posX < enemy.posX + enemy.width
                && player.posY + player.height + player.velY >= enemy.posY && player.posY <= enemy.posY + enemy.height) {

                if (!player.inmune) {
                    player.inmune = true
                    player.invincible()
                    player.lives--
                }
            }
        }
        )
    },

    bulletPower() {
        if (this.player.powerExtra) {
            if (this.framesCounter % 15 === 0)
                this.player.cooldown++
        }
        else {
            if (this.framesCounter % 45 === 0)
                this.player.cooldown++
        }
    },

    checkBulletsColl(player) {
        this.player.bullets.forEach(bullet => {
            if (bullet.posX + bullet.width + bullet.velX >= this.boss.posX
                && bullet.posX + bullet.width <= this.boss.posX) {
                this.boss.lives--
                if (this.boss.lives <= 0) {
                    this.boss.posY = 1500
                    this.platforms[15].posY = 525
                }
            }
        })

        this.boss.meteors.forEach(meteor => {
            if (this.player.posX + this.player.width - 100 >= meteor.posX && this.player.posX <= meteor.posX + meteor.width
                && this.player.posY + this.player.height + this.player.velY >= meteor.posY && this.player.posY <= meteor.posY + meteor.height) {

                if (!player.inmune) {
                    player.inmune = true
                    player.invincible()
                    player.lives--
                }
            }
        })
    },

    spaceshipColl(player) {
        if (player.posX + player.width - 20 >= this.spaceship.posX && player.posX < this.spaceship.posX + this.spaceship.width) {
            setTimeout(() => {
                this.winGame()
            }, 3000)
        }
    },

    shopColl(player) {
        if (player.posX + player.width >= this.shop.posX && player.posX < this.shop.posX + this.shop.width && player.keys.lKeyPressed) {
            if (player.lives === 2 && this.score.score >= 10) {
                player.lives++, this.score.score -= 10
            }
            if (player.lives === 1 && this.score.score >= 10) {
                player.lives++, this.score.score -= 10
            }
            if (player.lives === 1 && this.score.score >= 20) {
                player.lives += 2, this.score.score -= 20
            }
        }
        if (player.posX + player.width >= this.shop.posX && player.posX < this.shop.posX + this.shop.width && player.keys.pKeyPressed) {
            if (this.score.score >= 20) {
                this.score.score -= 20
                player.powerExtra = true
                player.velY -= 15
            }
        }
    }
}
