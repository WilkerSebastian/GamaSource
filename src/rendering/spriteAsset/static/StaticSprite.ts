import GamaSource, { Vector2, GameObject, GameMath } from "../../../GamaSource";
import GameImage from "../../../asset/image/GameImage";
import Sprite from "../../Sprite"

export default class StaticSprite extends Sprite {

    private image: GameImage 
    public scale = new Vector2(1,1)
    public rotation = 0

    constructor(source: string , reference:Vector2 | GameObject, width:number, height:number) {
        super(reference, width, height);

        const image = GamaSource.ASSETS.get(source) as GameImage | undefined

        if (!image) {

            console.error("Error on instace of StaticSprite " + source);
            GamaSource.falied()
            
            this.image = new GameImage("failed")
            return
            
        }
        
        this.image = image

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