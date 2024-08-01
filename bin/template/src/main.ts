import { GamaSource, GameObject } from "gamasource"
import Player from "./scripts/Player"
import atomic from "./assets/atomic.png"

const game = new GamaSource()

game.loader(atomic)

game.addScene("main", () => {

    GameObject.create(Player)
    
})

game.run()