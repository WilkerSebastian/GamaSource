import GameObject from "../gameObject/GameObject";
import Vector2 from "../math/vector/Vector2";

export default abstract class Sprite {

    public reference: Vector2 | GameObject = new Vector2(0,0)
    public width = 0;
    public height = 0;

    constructor(reference:Vector2 | GameObject, width:number, height:number) {

        this.reference = reference
        this.width = width
        this.height = height

    }

    public abstract render():void

}