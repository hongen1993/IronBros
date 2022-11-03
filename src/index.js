onload = () => {
    const canvas = document.querySelector('#canvas')
    const gameIntro = document.querySelector('.game-intro')

    document.querySelector('#start-button').addEventListener('click', () => {
        gameIntro.classList.toggle('non-display')
        canvas.classList.toggle('non-display')
        Game.init()
    })
}