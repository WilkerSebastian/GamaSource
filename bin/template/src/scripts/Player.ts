import { GameObject, KeyBoard, StaticSprite } from "gamasource";

export default class Player extends GameObject {

    private speed = 5;

    start() {
        
        this.transform.set(350, 350)
        this.sprite = new StaticSprite("atomic.png", this, 38)

    }

    update() {

        if (KeyBoard.getKeyDown("w")) {
            
            this.transform.y -= this.speed

        }
        if (KeyBoard.getKeyDown("a")) {

            this.transform.x -= this.speed
            
        }
        if (KeyBoard.getKeyDown("d")) {

            this.transform.x += this.speed
            
        }
        if (KeyBoard.getKeyDown("s")) {

            this.transform.y += this.speed
            
        }
        
    }

}