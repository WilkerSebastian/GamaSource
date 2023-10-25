import Vector2 from "../../../math/vector/Vector2";
import GameObject from "../../../gameObject/GameObject" 
import StaticSprite from "../static/StaticSprite";
import Slice from "./Slice";
import GamaSource, { GameMath } from "../../../GamaSource";

export default class SpriteSheet extends StaticSprite{

    private gameFrame;
    private staggerFrames:number
    private slices:Slice[]

    constructor(source: string , reference:Vector2 | GameObject, width:number, height:number, slices:Slice[], staggerFrames?:number) {
        super(source, reference, width, height)
        this.slices = slices
        
        this.gameFrame = 0;
        this.staggerFrames = staggerFrames ?? this.slices.length / 2

    }

    public render(): void {

        const index = GameMath.parseInt(this.gameFrame / this.staggerFrames) % this.slices.length 

        const slice = this.slices[index];
        
        if (this.reference instanceof GameObject) {

            GamaSource.ctx.drawImage(
                this.getImage().getSource() as HTMLImageElement,
                slice.x,
                slice.y,
                slice.width,
                slice.height,
                this.reference.transform.x,
                this.reference.transform.y,
                this.width,
                this.height
            )

            this.gameFrame++;
            
            return

        }

        GamaSource.ctx.drawImage(
            this.getImage().getSource() as HTMLImageElement,
            slice.x,
            slice.y,
            slice.width,
            slice.height,
            this.reference.x,
            this.reference.y,
            this.width,
            this.height
        )

        this.gameFrame++;

    }

}