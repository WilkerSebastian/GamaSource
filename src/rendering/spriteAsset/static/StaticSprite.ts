import GamaSource, { Vector2, GameObject, GameMath } from "../../../GamaSource";
import GameImage from "../../../asset/image/GameImage";
import Sprite from "../../Sprite"
import SizeSprite from "../SizeSprite";

export default class StaticSprite extends Sprite implements SizeSprite {

    private image: GameImage 
    private pixelRatio:number
    public scale = new Vector2(1,1)
    public rotation = 0

    constructor(source: string, reference:Vector2 | GameObject, pixelRatio: number | {width:number, height:number}) {
        super(reference, 0,0);

        const image = GamaSource.ASSETS.get(source) as GameImage | undefined

        if (typeof pixelRatio == "number") {
         
            this.pixelRatio = pixelRatio / 100

        } else {

            this.pixelRatio = 1

            this.width = pixelRatio.width
            this.height = pixelRatio.height

        }

        if (!image) {

            console.error("Error on instace of StaticSprite " + source);
            GamaSource.falied()
            
            this.image = new GameImage("failed")

            return
            
        }
        
        this.image = image

        if (typeof pixelRatio == "number") {

            this.setWidth(this.image.getSource().width)
            this.setHeight(this.image.getSource().height)

        }

    }

    public setWidth(width:number) {
        
        this.width = width * this.pixelRatio * GamaSource.window.getScale()

    }

    public setHeight(height:number) {
        
        this.height = height * this.pixelRatio * GamaSource.window.getScale()

    }

    public getSize() {
        
        return {width:this.width, height:this.height}

    }

    public getImage() {

        return this.image

    }

    public render(): void {

        GamaSource.ctx.save()

        if (this.reference instanceof GameObject) {

            GamaSource.ctx.translate(this.reference.transform.x + this.width / 2, this.reference.transform.y + this.height / 2)
            
        } else {

            GamaSource.ctx.translate(this.reference.x + this.width / 2, this.reference.y + this.height / 2)

        }

        GamaSource.ctx.rotate(GameMath.degressToRadian(this.rotation))

        GamaSource.ctx.scale(this.scale.x, this.scale.y)

        GamaSource.ctx.drawImage(
            this.image.getSource() as HTMLImageElement,
            -this.width / 2, 
            -this.height / 2, 
            this.width, 
            this.height
        )

        GamaSource.ctx.restore()

    }

}