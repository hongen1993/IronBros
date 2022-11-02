class Game {
    constructor() {
        this.points = 0
        this.treats = 0
        this.lives = 3
        this.treatsToGetLive = 10
        this.map = { end: 9550 }
        this.timeEnd = null
        this.timeLeft = null
        this.started = false
    }

    update() {
        if (this.started) {
            const currentTime = Date.now()
            this.timeLeft = Math.max(Math.ceil((this.timeEnd - currentTime) / 1000), 0)

            if (this.timeLeft <= 15)
                elTimeLeft.classList.add('out-of-time')
            else
                elTimeLeft.classList.remove('out-of-time')
        }
        this.draw()
    }

    start(levelDuration = 90000) {
        this.started = true
        this.timeLeft = Math.floor(levelDuration / 1000)
        this.timeEnd = Date.now() + levelDuration
    }

    applyBonusPointsForTimeLeft() {
        if (this.timeLeft > 0) {
            setTimeout(() => {
                this.addPoints({ action: ACTIONS.REMAININGSECOND, times: 1, show: false })
                playAudio(audioStore.whisleEffect)
                this.timeLeft = Math.floor(this.timeLeft - 1)
                this.applyBonusPointsForTimeLeft()
            }, 100)
        }
    }


    finish() {
        this.started = false
    }

    addPoints({ action = ACTIONS.STOMPMONSTER, times = 1, show = true, position = { x: 0, y: 0 } }) {
        if (show) {
            if (action === ACTIONS.ONEUP) effects.push(new PointEffect({ position: { x: position.x + 10, y: position.y - 20 }, value: '1UP' }))
            else effects.push(new PointEffect({ position, value: action.points * times }))
        }
        this.points += action.points * times
    }

    addLives(plusLives) {
        this.lives += plusLives
        playAudio(audioStore.oneLiveUpEffect)
    }

    addTreats(plusTreats) {
        this.treats += plusTreats
        playAudio(audioStore.whisleEffect)

        if (this.treats >= this.treatsToGetLive) {
            this.addLives(Math.floor(this.treats / this.treatsToGetLive))
            this.treats = this.treats % this.treatsToGetLive
        }
    }

    draw() {
        elTreats.textContent = this.treats
        elLives.textContent = this.lives
        elPoints.textContent = this.points
        const timeMilitarFormat = '' + (10000 + Math.floor(this.timeLeft / 60) * 100 + this.timeLeft % 60)
        elTimeLeft.textContent = timeMilitarFormat.substring(1, 3) + ":" + timeMilitarFormat.substring(3, 5)
    }
}