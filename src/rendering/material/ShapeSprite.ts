import GameObject from "../../gameObject/GameObject"
import Vector2 from "../../math/vector/Vector2"
import Sprite from "../Sprite"

export default abstract class ShapeSprite extends Sprite {

    public color:string

    constructor(width:number, height:number, color:string, reference?:Vector2 | GameObject) {

        super(width, height, reference)
        this.color = color

    }
}