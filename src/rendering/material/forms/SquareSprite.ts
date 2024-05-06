import GamaSource, { GameMath } from "../../../GamaSource";
import GameObject from "../../../gameObject/GameObject";
import Vector2 from "../../../math/vector/Vector2";
import ShapeSprite from "../ShapeSprite";

export default class SquareSprite extends ShapeSprite {

    constructor(width:number, height:number, color:string, reference?:Vector2 | GameObject) {

        super(width, height, color, reference)

    }

    public render() {

        const { x, y, width, height } = this.getRenderObject()

        GamaSource.ctx.save()

        GamaSource.ctx.fillStyle = this.color

        GamaSource.ctx.translate(x, y)

        GamaSource.ctx.rotate(GameMath.degreesToRadians(this.rotation))

        GamaSource.ctx.scale(this.scale.x, this.scale.y)

        GamaSource.ctx.fillRect(
            -width / 2, 
            -height / 2, 
            width, 
            height
        )

        GamaSource.ctx.restore()

    }

}