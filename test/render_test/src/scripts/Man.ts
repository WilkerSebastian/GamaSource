import { GameObject, AnimationController, Animation, Gamepads, Vector2 } from "gamasource"
import man from "../assets/anim/man.json"

export default class Man extends GameObject {

    private sprite = AnimationController.load(man as Animation[])

    start(): void {
        
        this.transform.set(0, 0)

        this.setComponent("Rendering", this.sprite)

    }

    update(): void {

        let axios = Vector2.zero()
        
        if (Gamepads.first)
            axios = Gamepads.first.getLeftAxis()

        if (axios.isNullVector())
            this.sprite.set("idle")

        else    
            this.sprite.set("run")

        this.sprite.scale.x = axios.x >= 0 ? 1 : -1

        this.transform.addInPlace(axios.multiply(15))

    }

}