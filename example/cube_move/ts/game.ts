import GamaSource from "gamasource";
import {GameObject} from "gamasource";
import Player from "./Player";

const game = new GamaSource()

game.main = () => {

    GameObject.create(Player) 

}
 
game.run() 