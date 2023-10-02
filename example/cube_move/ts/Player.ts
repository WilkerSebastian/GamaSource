import GamaSource, { GameObject, KeyBoard, SquareSprite } from "gamasource";

export default class Player extends GameObject {

    speed = 5

    start() {

        this.transform.set(GamaSource.window.size.getWidth(50), GamaSource.window.size.getHeight(50))
        this.sprite = new SquareSprite(this, 50, 50, "#6C47E5")
    
    }

    update() {
        
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