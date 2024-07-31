import { GameObject, KeyBoard, StaticSprite } from "gamasource";

export default class Player extends GameObject {

    private speed = 5;
    private sprite = new StaticSprite("atomic.png", 38)

    start() {
        
        this.transform.set(350, 350)
        
        this.setComponent("Rendering", this.sprite)

    }

    update() {
        
        const axios = KeyBoard.getAxios("transverse")

        this.transform.addInPlace(axios.multiply(this.speed))
        
    }

}