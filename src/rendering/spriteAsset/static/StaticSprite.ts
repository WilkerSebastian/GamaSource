import GameImage from "../../../asset/image/GameImage";
import GamaSource from "../../../core/GamaSource";
import GameObject from "../../../gameObject/GameObject";
import GameMath from "../../../math/GameMath";
import Vector2 from "../../../math/vector/Vector2";
import Sprite from "../../Sprite"
import SizeSprite from "../SizeSprite";

export default class StaticSprite extends Sprite implements SizeSprite {

    private image: GameImage 
    private pixelRatio:number

    constructor(source: string, pixelRatio: number | {width:number, height:number}, reference?:Vector2 | GameObject) {
        super(0, 0, reference);

        const image = GamaSource.ASSETS.get(source) as GameImage | undefined

        this.pixelRatio = 1

        if (!image) {

            console.error("Error on instace of StaticSprite " + source);
            GamaSource.falied()
            
            this.image = new GameImage("failed")

            return
            
        }
        
        if (typeof pixelRatio == "number") { 
            
            this.pixelRatio = pixelRatio / 100  

            this.width = image.getSource().width * this.pixelRatio
            this.height = image.getSource().height * this.pixelRatio

        } else {

            this.width = pixelRatio.width
            this.height = pixelRatio.height

        }
        
        this.image = image

    }


    public getImage() {

        return this.image

    }

    public render(): void {

        const { x, y, width, height } = this.getRenderObject()

        GamaSource.ctx.save()

        GamaSource.ctx.translate(x, y)

        GamaSource.ctx.rotate(GameMath.degreesToRadians(this.rotation))

        GamaSource.ctx.scale(this.scale.x, this.scale.y)

        GamaSource.ctx.drawImage(
            this.image.getSource() as HTMLImageElement,
            -width / 2, 
            -height / 2, 
            width, 
            height
        )
        
        GamaSource.ctx.restore()

    }

}