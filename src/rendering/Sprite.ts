import GameObject from "../gameObject/GameObject";
import Component from "../gameObject/components/Component";
import Vector2 from "../math/vector/Vector2";
import SizeSprite from "./spriteAsset/SizeSprite";

export default abstract class Sprite extends Component implements SizeSprite {

    public reference?: Vector2 | GameObject
    public width = 0;
    public height = 0;

    constructor(width:number, height:number, reference?:Vector2 | GameObject) {
        super()
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