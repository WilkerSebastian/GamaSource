import GamaSource from "../../GamaSource"
import GameImage from "../../asset/image/GameImage"
import FrameComponent from "../FrameComponent"
import FramePanelConfig from "../config/FramePanelConfig"

export default class FramePanel extends FrameComponent {

    protected source: string | GameImage
    protected rounded: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined
    protected border: {
        color?:string
        size?:number
    }

    constructor(frame: FramePanelConfig) {
        super(frame)

        this.source = "#fff"

        if (frame.source) {
         
            const possibleImage = GamaSource.ASSETS.get(frame.source)

            if (possibleImage instanceof GameImage)
                this.source = possibleImage
            else
                this.source = frame.source

        }

        this.rounded = frame.rounded ?? 0
        this.border = frame.border ?? {}
    }

    protected render(): void {

        GamaSource.ctx.save()

        GamaSource.ctx.filter = `brightness(${this.brightness}%)`

        GamaSource.ctx.scale(this.getScaleX(), this.getScaleY())

        if(this.border.size) {

            GamaSource.ctx.strokeStyle = this.border.color ?? "#fff"
            GamaSource.ctx.save()
            GamaSource.ctx.scale(1 + (this.border.size / 100),1 + (this.border.size / 100))
            GamaSource.ctx.strokeRect(this.getPosition().x, this.getPosition().y, this.width, this.height)
            GamaSource.ctx.restore()
        
        }

        if (this.source instanceof GameImage) {

            GamaSource.ctx.save();
            if (typeof this.rounded == "number") {
                if (this.rounded > 0) {
                    const radius = (this.rounded / 100) * Math.min(this.width, this.height) / 2;

                    GamaSource.ctx.beginPath(); 
                    GamaSource.ctx.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2, true);
                    GamaSource.ctx.closePath();
                    GamaSource.ctx.clip();   
                }
            }
            GamaSource.ctx.drawImage(
                this.source.getSource(),
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
            GamaSource.ctx.restore();
            
            return
        }
        
        GamaSource.ctx.beginPath()
        GamaSource.ctx.fillStyle = this.source
        GamaSource.ctx.roundRect(this.getPosition().x, this.getPosition().y, this.getWidth(), this.getHeight(), this.rounded)
        GamaSource.ctx.fill()
        GamaSource.ctx.closePath()

        GamaSource.ctx.restore()

    }

}