onload = () => {
    const canvas = document.querySelector('#canvas')
    const gameIntro = document.querySelector('.game-intro')

    document.querySelector('#start-button').addEventListener('click', () => {
        gameIntro.classList.toggle('non-display')
        canvas.classList.toggle('non-display')
        Game.init()
    })
}

// TITO

//const canvas = document.getElementById("game-canvas")
//const btnStart = document.getElementById("button-start")
//const elPoints = document.getElementById("points")
//const elLives = document.getElementById("lives")
//const elTimeLeft = document.getElementById("timeLeft")
//const elTreats = document.getElementById("treats")
//const ctx = canvas.getContext("2d")
//const GRAVITY = 1
//const PLAYER_POWERS = {
//    NONE: 'none',
//    SUPER: 'super',
//    FIREBALL: 'fireball',
//    INVINCIBLE: 'invincible',
//    ONEUP: '1up',
//}
//
//const ACTIONS = {
//    BREAKBLOCK: { points: 50 },
//    COLLECTTREAT: { points: 200 },
//    COLLECTPOWERUP: { points: 1000 },
//    BLOCKMONSTER: { points: 200 },//[100,200,400,500,800,1000,2000,4000,5000,8000,PLAYER_POWERS.ONEUP]},
//    STOMPMONSTER: { points: 100 },//[100,200,400,500,800,1000,2000,4000,5000,8000,PLAYER_POWERS.ONEUP]},
//    FIREBALLMONSTER: { points: 200 },
//    ROOMBAMONSTER: { points: 500 },//[500,800,1000,2000,4000,5000,8000,PLAYER_POWERS.ONEUP]},
//    KICKROOMBA: { points: 400 },
//    REMAININGSECOND: { points: 50 },
//    ONEUP: { points: 0 },
//    INVINCIBLEMONSTER: { points: 400 },
//    FINISHLEVELHEIGHT: { points: 50 }
//}
//
//
//const COLLISIONRESULT = {
//    NOHIT: 'no-hit',
//    TAKEHIT: 'take-hit',
//    FATALHIT: 'fatal-hit'
//}
//
//const audioStore = {
//    backgroundMusic: loadAudio('./audio/background-music.mp3.ogg', 0.2, true),
//    loseMusic: loadAudio('./audio/lose.ogg', 1),
//    monsterStompEffect: loadAudio('./audio/monster-stomp.ogg', 0.7),
//    monsterStompEffect2: loadAudio('./audio/monster-stomp.ogg', 0.7),
//    jumpEffect: loadAudio("./audio/jump.mp3.ogg"),
//    fireEffect: loadAudio('./audio/shoot.ogg', 1),
//    powerUpEffect: loadAudio('./audio/power-up.mp3', 1),
//    powerUpAppliedEffect: loadAudio('./audio/power-up-applied2.mp3', 0.7),
//    oneLiveUpEffect: loadAudio('./audio/one-live-up.mp3', 0.7),
//    fireballHitBlockEffect: loadAudio('./audio/shoot.ogg', 1),
//    whisleEffect: loadAudio('./audio/whisle.ogg', 1),
//    winJingle: loadAudio('./audio/winjingle.ogg', 1),
//}
//
//const imageStore = {
//    surpriseBlock: loadImage("./img/surprise-block.png"),
//    disabledBlock: loadImage("./img/disabled-block.png"),
//    brownBlock: loadImage("./img/brown-wooden-block.png"),
//    debrisBrownBlock: loadImage("./img/debris-brown-wooden-block.png"),
//    redBlock: loadImage("./img/red-wooden-block.png"),
//    blueBlock: loadImage("./img/blue-wooden-block.png"),
//    floorBlock: loadImage("./img/floor-block.png"),
//    pipe: loadImage("./img/pipe.png"),
//    player: loadImage("./img/player.png"),
//    monsterKokoa: loadImage("./img/kokoa.png"),
//    monsterCatRoomba: loadImage("./img/cat-roomba.png"),
//    background: loadImage("./img/background.jpg"),
//    powerUp: loadImage("./img/power-up.png"),
//    treat: loadImage("./img/treat2-Sheet.png"),
//    treatJump: loadImage("./img/treat-jump-Sheet.png"),
//    teepee: loadImage("./img/teepee.png"),
//    teepeeFront: loadImage("./img/teepee-front.png"),
//    enterTeepee: loadImage("./img/enter-teepee-sprite-Sheet.png"),
//}
//let teepeeX
//
//function startGame() {
//    btnStart.classList.add('hide')
//    game.start()
//    audioStore.backgroundMusic.play()
//    requestAnimationFrame(animate)
//}
//
//function rectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
//    return x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1
//}
//
//function loadAudio(src, volume = 0.3
//    , loop = false) {
//    var audio = document.createElement("audio")
//    audio.volume = volume
//    audio.loop = loop
//    audio.src = src
//    return audio
//}
//
//function playAudio(audio) {
//    if (!audio.paused) {
//        audio.pause()
//        audio.currentTime = 0
//    }
//    audio.play()
//}
//
//function loadImage(src) {
//    const img = document.createElement("img")
//    img.src = src
//    return img
//}
