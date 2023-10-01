import GamaSource from "../../../src/GamaSource";
import GameOject from "../../../src/gameObject/GameObject";
import Cube from "./Cube";

const game = new GamaSource()

game.main = () => {

    GameOject.create(Cube) 

}
 
game.run() 