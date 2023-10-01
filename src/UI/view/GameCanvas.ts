import GamaSource from "../../GamaSource"

export default () => {

    document.body.style.boxSizing = "boxSizing"
    document.body.style.margin = "0"

    const game = document.createElement("canvas")
    game.id = "game"
    game.style.position = "absolute"
    game.style.top = "0"
    game.style.bottom = "0"
    game.style.left = "0"
    game.style.right = "0"
    game.width = GamaSource.window.WIDTH
    game.height = GamaSource.window.HEIGHT

    GamaSource.window.addEvent(() => {

        game.width = GamaSource.window.WIDTH
        game.height = GamaSource.window.HEIGHT

    })

    document.body.appendChild(game)

}