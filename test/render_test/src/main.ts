import { GamaSource, GameObject } from "gamasource"
import Cube from "./scripts/Cube"

const game = new GamaSource()

game.addScene("main", () => {

    GameObject.create(Cube)
    
})

game.run()