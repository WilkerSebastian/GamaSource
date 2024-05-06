import GamaSource, { Vector2 } from "../GamaSource";
import GameObject from "../gameObject/GameObject";
import Component from "../gameObject/components/Component";
import SizeSprite from "./spriteAsset/SizeSprite";

export default abstract class Sprite extends Component implements SizeSprite {

    public reference: GameObject | Vector2
    public width:number;
    public height:number;
    public scale = new Vector2(1,1)
    public rotation = 0

    constructor(width:number, height:number, reference?:Vector2 | GameObject) {
        super()
        this.reference = reference || Vector2.zero()
        this.width = width
        this.height = height
    }

    public setWidth(width: number): void {
        this.width = width
    }

    public setHeight(height: number): void {
        this.height = height
    }

    public getSize(): { width: number; height: number; } {
        return { width:this.width, height:this.height}
    }

    public getRenderObject() {

        const vector = this.reference instanceof GameObject ? this.reference.transform : this.reference

        return {
            x: GamaSource.window.getScalableMeasure(vector.x),
            y: -GamaSource.window.getScalableMeasure(vector.y),
            width: GamaSource.window.getScalableMeasure(this.width),
            height: GamaSource.window.getScalableMeasure(this.height)
        }

    }   

    public abstract render():void

}