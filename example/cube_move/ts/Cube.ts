import GamaSource from "../../../src/GamaSource";
import GameOject from "../../../src/gameObject/GameObject";
import KeyBoard from "../../../src/input/KeyBoard";
import Vector2 from "../../../src/math/vector/Vector2";
import SquareSprite from "../../../src/rendering/material/forms/SquareSprite";

export default class Cube extends GameOject {

    private speed = 5

    public start() {

        this.transform = new Vector2(GamaSource.window.size.getWidth(50), GamaSource.window.size.getHeight(50))
        this.sprite = new SquareSprite(this, 50, 50, "#6C47E5")

    }

    public update() {
        
        if (KeyBoard.getKeyDown("w")) {

            this.transform.y -= this.speed

        }
        if (KeyBoard.getKeyDown("s")) {

            this.transform.y += this.speed

        }
        if (KeyBoard.getKeyDown("a")) {

            this.transform.x -= this.speed

        }
        if (KeyBoard.getKeyDown("d")) {

            this.transform.x += this.speed

        }
        
    }

}