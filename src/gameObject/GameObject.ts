import GamaSource from "../GamaSource"
import Vector2 from "../math/vector/Vector2"
import Sprite from "../rendering/Sprite"

export default class GameObject {

    public transform:Vector2 = new Vector2(0, 0)
    protected sprite: Sprite | null = null
    protected visible:boolean = true
    public layer:number = 1
    public tag:string = "not defined"

    public static create(obj: typeof GameObject) {

        GamaSource.GameObjects.push(new obj())

        GamaSource.GameObjects = GamaSource.GameObjects.sort((a,b) => a.layer - b.layer)

    }

    public destroy() {

        GamaSource.GameObjects = GamaSource.GameObjects.filter(obj => obj != this)

    }

    public static getElementByTag<T>(tag:string) {

        return GamaSource.GameObjects.filter(obj => obj.tag == tag)[0] as T

    }

    public static getAllElementsByTag<T>(tag:string) {

        return GamaSource.GameObjects.filter(obj => obj.tag == tag) as T

    }

    public start() {}

    protected update() {


    }

    public gameUpdate() {

        if (this.visible) {
            
            this.update()

        }

    }

    public render() {

        if (this.sprite && this.visible) {
            
            this.sprite.render()

        }

    }

}