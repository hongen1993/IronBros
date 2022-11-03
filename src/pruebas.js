
// AFINAR LA COLISION CON LOS ENEMIGOS Y HACER SU MOVIMIENTO ESTATICO
// REVISAR EL MOVIMIENTO PARA HACER LAS DIAGONALES ETC
// BUSCAR PRESETS
// ANIMACION DE DAÑO Y PERSONAJE?
// - COLISIONES CON LOS OBSTÁCULOS
// ..................................
// PRIORIDADES:

// - DESPLAZAMIENTO CORRECTO DE LAS PLATAFORMAS Y DEL MAPA.


/*  chekIntersection(r1, r2) {  // esto en game como colision
    if (this.platform.posX > this.player.posX + this.player.width) {
        return false
    } else if (this.platform.posX + this.platform.width <= this.player.posX) {
        return false
    } else if (this.platform.posY >= this.player.posY + this.player.height) {
        return false
    } else if (this.platform.posY + this.platform.height <= this.player.posY) {
        return false
    } else {
        return true
    }
} 

//horizontal col rectangulo //esto serian los valores de nuestras plataformas asiq ue no haria falta
const horizontalRect = {
    x: this.x + this.vel
    y: this.y
    width: this.width,
    height: this.height

}
// vertical colision rectangulo
const verticalRect = {
    x: this.x + this.velX
    y: this.y
    width: this.width,
    height: this.height
}

//chequear intersecciones
for (let i = 0; i < platforms.lenght; i++) { //esto busca en el array de plataformas
let platformRect = {
    x: platforms[i].x;
    y: platforms[i].y;
    width: platforms[i].width;
    height : platforms[i].height;
}

if(checkIntersection(horizontalRect, platformRect)) {
    while (checkIntersection(horizontalRect, platformRect)) {
        horizontalRect.x -= Math.sign(this.velX)
    } 
    this.x = horizontalRect.x; // restringir el movimiento por unos pixels para que siempre se choque
    this.velX = 0


}

if(checkIntersection(verticalRect, platformRect)) {
    while (checkIntersection(verticalRect, platformRect)) {
        verticalRect.y -= Math.sign(this.velY)
    } 
    this.y = verticalRect.y;
    this.velY = 0
}

} */

