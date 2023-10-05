import Vector2 from "../../../math/vector/Vector2";
import GameObject from "../../../gameObject/GameObject" 
import StaticSprite from "../static/StaticSprite";
import Slice from "./Slice";
import GamaSource from "../../../GamaSource";

export default class SpriteSheet extends StaticSprite{

    private slices:Slice[]
    private index = 0

    constructor(source: string , reference:Vector2 | GameObject, width:number, height:number, slices:Slice[]) {
        super(source, reference, width, height)
        this.slices = slices
        
    }

    public render(): void {

        if(this.index == this.slices.length) 
            this.index = 0

        const slice = this.slices[this.index]

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

    }

}