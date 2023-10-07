import {GamaSource, GameObject} from "gamasource"
import Player from "./scripts/Player"
import atomic from "./assets/atomic.png"

const game = new GamaSource()

game.addScene("main", () => {

    GamaSource.loader(atomic)

    GameObject.create(Player)
    
})

game.run()