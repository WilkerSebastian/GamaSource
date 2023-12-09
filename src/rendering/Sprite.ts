import GameObject from "../gameObject/GameObject";
import Vector2 from "../math/vector/Vector2";
import SizeSprite from "./spriteAsset/SizeSprite";

export default abstract class Sprite implements SizeSprite {

    public reference?: Vector2 | GameObject
    public width = 0;
    public height = 0;

    constructor(width:number, height:number, reference?:Vector2 | GameObject) {

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

    public abstract render(reference?:GameObject | Vector2):void

}