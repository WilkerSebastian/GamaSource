import GamaSource from "../GamaSource"
import Vector2 from "../math/vector/Vector2"
import Sprite from "../rendering/Sprite"

export default class GameOject {

    public transform:Vector2 = new Vector2(0, 0)
    protected sprite: Sprite | null = null
    public tag:string = "not defined"

    public static create(obj: typeof GameOject) {

        GamaSource.GameObjects.push(new obj())

    }

    public start() {}

    public update() {}

    public render() {

        if (this.sprite) {
            
            this.sprite.render()

        }

    }

}