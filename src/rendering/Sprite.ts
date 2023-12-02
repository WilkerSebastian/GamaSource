import GameObject from "../gameObject/GameObject";
import Vector2 from "../math/vector/Vector2";
import SizeSprite from "./spriteAsset/SizeSprite";

export default abstract class Sprite implements SizeSprite {

    public reference: Vector2 | GameObject = new Vector2(0,0)
    public width = 0;
    public height = 0;

    constructor(reference:Vector2 | GameObject, width:number, height:number) {

        this.reference = reference
        this.width = width
        this.height = height

    }
    setWidth(width: number): void {
        this.width = width
    }
    setHeight(height: number): void {
        this.height = height
    }
    getSize(): { width: number; height: number; } {
        return { width:this.width, height:this.height}
    }

    public abstract render():void

}