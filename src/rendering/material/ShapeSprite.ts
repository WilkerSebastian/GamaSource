import GameObject from "../../gameObject/GameObject"
import Vector2 from "../../math/vector/Vector2"
import Sprite from "../Sprite"

export default abstract class ShapeSprite extends Sprite {

    public color:string

    constructor(reference:Vector2 | GameObject, width:number, height:number, color:string) {

        super(reference, width, height)
        this.color = color

    }
}