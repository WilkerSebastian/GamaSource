import GamaSource from "../../../GamaSource";
import GameObject from "../../../gameObject/GameObject";
import Vector2 from "../../../math/vector/Vector2";
import ShapeSprite from "../ShapeSprite";

export default class SquareSprite extends ShapeSprite {

    constructor(width:number, height:number, color:string, reference?:Vector2 | GameObject) {

        super(width, height, color, reference)

    }

    public render() {

        if(!this.reference)
            this.reference = new Vector2(0,0)

        if (this.reference instanceof GameObject) {
        
            GamaSource.ctx.fillStyle = this.color
            GamaSource.ctx.fillRect(this.reference.transform.x, this.reference.transform.y, this.width, this.height)

        } else if (this.reference instanceof Vector2) {

            GamaSource.ctx.fillStyle = this.color
            GamaSource.ctx.fillRect(this.reference.x, this.reference.y, this.width, this.height)

        }

    }

}