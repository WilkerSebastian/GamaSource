import { GamaSource, GameObject } from "gamasource"
import Cube from "./scripts/Cube"
import Man from "./scripts/Man"
import man_idle from "./assets/sprites/man_idle.png"
import man_run from "./assets/sprites/man_run.png"

const game = new GamaSource()

game.loader(man_idle, man_run)

let i = 1
const statges = ["main", "man_animation"]

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key === "ArrowRight")
        game.changeScene(statges[i++ % statges.length])


})

game.addScene("main", () => {

    GameObject.create(Cube)
    
    
})

game.addScene("man_animation", () => {

    GameObject.create(Man)

})

game.run()