/* moveLeft() {
    if (this.posX > 100) this.posX -= 10
}

moveRight() {
    if (this.posX < 700) this.posX += 10
}

if (this.keys.aKeyPressed) this.moveLeft() */




/*
if (this.player.keys.dKeyPressed && this.player.posX < 700) {
    this.player.velX = 10
} else if (this.player.keys.akeyPressed && this.player.posX > 100) {
    this.player.velX = -10
} else {
    this.player.velX = 0
    if (this.player.keys.dKeyPressed) {
        this.platform.posX -= 10
    } else if (this.player.keys.akeyPressed) {
        this.platform.posX += 10
    }

} */

// AFINAR LA COLISION CON LOS ENEMIGOS Y HACER SU MOVIMIENTO ESTATICO
// REVISAR EL MOVIMIENTO PARA HACER LAS DIAGONALES ETC
// MOVER EL FONDO MAL
// MAS PLATAFORMAS, CREAR ARRAY PARA DARLE NUEVOS VALORES ETC
// CREAR LOS VACIOS, ES OTRA FORMA DE COLISION
// FORMA DE GANAR
// PARALAJE mover el fondo mas lento que el jugador y el suelo, fondo mas lento quie el plano cercano, hay que darle profundidad creando otra capa más. Fondo neutro, capa con nubes o x cosas, jugador obstaculos etc
// BUSCAR PRESETS
// ANIMACION DE DAÑO Y PERSONAJE?
// CREAR LA PLATAFORMA DEL SUELO


//PLATAFORMAS

/* this.platforms = [new Platform(this.ctx, this.width, this.height)] // this.platform = new Platform(this.ctx, this.width, this.height)
this.platforms.forEach(platform => {  // this.platform.draw()
    this.platform.draw()
})

if (this.player.keys.dKeyPressed && this.player.posX < 850) {
    console.log(this.platform.posX)
    this.player.posX += 7
} else if (this.player.keys.aKeyPressed && this.player.posX > 100) {
    console.log('Izquierda')
    this.player.posX -= 7
} else {
    this.player.velX = 0
    if (this.player.keys.dKeyPressed) {
        this.platform.posX -= 7 // 
    } else if (this.player.keys.aKeyPressed) {
        this.platform.posX += 7
    }

}
 */
/* 
clearBullets() {
    // this.player.bullets = this.player.bullets.filter(bullet => bullet.posX < this.width)


    this.player.bullets.forEach((bullet, i, bullets) => {
        if (bullet.posX + bullet.width - 150 > this.boss.posX) {
            bullets.splice(i, 1)
        }
    })
}, */
