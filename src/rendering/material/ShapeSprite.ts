import GameOject from "../../gameObject/GameObject"
import Vector2 from "../../math/vector/Vector2"
import Sprite from "../Sprite"

export default abstract class ShapeSprite extends Sprite {

    public color:string

    constructor(reference:Vector2 | GameOject, width:number, height:number, color:string) {

        super()
        this.reference = reference
        this.width = width
        this.height = height
        this.color = color

    }
}