import GamaSource from "../../../GamaSource";
import GameObject from "../../../gameObject/GameObject";
import Vector2 from "../../../math/vector/Vector2";
import ShapeSprite from "../ShapeSprite";

export default class SquareSprite extends ShapeSprite {

    constructor(reference:Vector2 | GameObject, width:number, height:number, color:string) {

        super(reference, width, height, color)

    }

    public render() {

        if (this.reference instanceof GameObject) {
        
            GamaSource.ctx.fillStyle = this.color
            GamaSource.ctx.fillRect(this.reference.transform.x, this.reference.transform.y, this.width, this.height)

            return 
        }

        GamaSource.ctx.fillStyle = this.color
        GamaSource.ctx.fillRect(this.reference.x, this.reference.y, this.width, this.height)

    }

}