import Vector2 from "../../../math/vector/Vector2";
import GameObject from "../../../gameObject/GameObject" 
import StaticSprite from "../static/StaticSprite";
import Slice from "./Slice";
import GamaSource from "../../../core/GamaSource";
import GameMath from "../../../math/GameMath";

export default class SpriteSheet extends StaticSprite{

    private gameFrame:number;
    private staggerFrames:number
    private slices:Slice[]
    private originScalable = true

    constructor(source: string, pixelRatio: number | {width:number, height:number}, slices:Slice[], staggerFrames?:number, reference?:Vector2 | GameObject) {
        super(source, pixelRatio, reference)
        this.slices = slices

        const slice = slices[0]

        if (typeof pixelRatio == "number") { 
            this.setWidth(slice.width)
            this.setHeight(slice.height) 
        } else 
            this.originScalable = false;
        
        this.gameFrame = 0;
        this.staggerFrames = staggerFrames ?? this.slices.length / 2

    }

    public render(): void {

        const index = GameMath.parseInt(this.gameFrame / this.staggerFrames) % this.slices.length 

        const slice = this.slices[index];
        
        if (this.originScalable) {
            this.setWidth(slice.width)
            this.setHeight(slice.height)
        }

        const { x, y, width, height } = this.getRenderObject()

        GamaSource.ctx.save()
        
        GamaSource.ctx.translate(x, y)

        GamaSource.ctx.rotate(GameMath.degreesToRadians(this.rotation))

        GamaSource.ctx.scale(this.scale.x, this.scale.y)

        GamaSource.ctx.drawImage(
            this.getImage().getSource() as HTMLImageElement,
            slice.x,
            slice.y,
            slice.width,
            slice.height,
            -width / 2, 
            -height / 2, 
            width, 
            height
        )

        GamaSource.ctx.restore()

        this.gameFrame++;

    }

}