import Vector2 from "../../../math/vector/Vector2";
import GameObject from "../../../gameObject/GameObject" 
import StaticSprite from "../static/StaticSprite";
import Slice from "./Slice";
import GamaSource, { GameMath } from "../../../GamaSource";

export default class SpriteSheet extends StaticSprite{

    private gameFrame;
    private staggerFrames:number
    private slices:Slice[]

    constructor(source: string, pixelRatio: number, slices:Slice[], staggerFrames?:number, reference?:Vector2 | GameObject) {
        super(source, pixelRatio, reference)
        this.slices = slices

        const slice = slices[0]

        this.setWidth(slice.width)
        this.setHeight(slice.height)
        
        this.gameFrame = 0;
        this.staggerFrames = staggerFrames ?? this.slices.length / 2

    }

    public render(reference?:Vector2 | GameObject): void {

        if (!this.reference && reference)
            this.reference = reference

        else if(!this.reference)
            this.reference = new Vector2(0,0)

        const index = GameMath.parseInt(this.gameFrame / this.staggerFrames) % this.slices.length 

        const slice = this.slices[index];

        this.setWidth(slice.width)
        this.setHeight(slice.height)

        GamaSource.ctx.save()

        if (this.reference instanceof GameObject)
            GamaSource.ctx.translate(this.reference.transform.x + this.width / 2, this.reference.transform.y + this.height / 2)
            
        else if (this.reference instanceof Vector2)
            GamaSource.ctx.translate(this.reference.x + this.width / 2, this.reference.y + this.height / 2)

        GamaSource.ctx.rotate(GameMath.degressToRadian(this.rotation))

        GamaSource.ctx.scale(this.scale.x, this.scale.y)

        GamaSource.ctx.drawImage(
            this.getImage().getSource() as HTMLImageElement,
            slice.x,
            slice.y,
            slice.width,
            slice.height,
            -this.width / 2, 
            -this.height / 2, 
            this.width, 
            this.height
        )

        GamaSource.ctx.restore()

        this.gameFrame++;

    }

}