import GamaSource, { Vector2, GameObject } from "../../../GamaSource";
import GameImage from "../../../asset/image/GameImage";
import Sprite from "../../Sprite"

export default class StaticSprite extends Sprite {

    private image: GameImage

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

        if (this.reference instanceof GameObject) {

            GamaSource.ctx.drawImage(
                this.image.getSource() as HTMLImageElement,
                this.reference.transform.x,
                this.reference.transform.y,
                this.width,
                this.height
            )
            
            return

        }

        GamaSource.ctx.drawImage(
            this.image.getSource() as HTMLImageElement,
            this.reference.x,
            this.reference.y,
            this.width,
            this.height
        )

    }


}