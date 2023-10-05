import GamaSource from "../../GamaSource"
import ratio from "../../define/ratio"
import FrameComponent from "../FrameComponent"

export default class FramePanel extends FrameComponent {

    protected source: string
    protected rounded: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined
    protected border: {
        color?:string
        size?:number
    }

    constructor(frame: {x:ratio, y:ratio, width:ratio, height:ratio, visible?:boolean, father?:FrameComponent, source?:string, rounded?:number | DOMPointInit | Iterable<number | DOMPointInit>, border?: {color?:string,size?:number}}) {
        super(frame)
        this.source = frame.source ?? "#fff"
        this.rounded = frame.rounded ?? 0

        this.border = frame.border ?? {}

    }

    protected render(): void {

        if (this.border.color) {
            GamaSource.ctx.strokeStyle = this.border.color
        }

        if(this.border.size) {

            GamaSource.ctx.save()
            GamaSource.ctx.scale(1 + (this.border.size / 100),1 + (this.border.size / 100))
            GamaSource.ctx.strokeRect(this.getPosition().x, this.getPosition().y, this.width, this.height)
            GamaSource.ctx.restore()
        
        }
        
        GamaSource.ctx.beginPath()
        GamaSource.ctx.fillStyle = this.source
        GamaSource.ctx.roundRect(this.getPosition().x, this.getPosition().y, this.getWidth(), this.getHeight(), this.rounded)
        GamaSource.ctx.fill()
        GamaSource.ctx.closePath()

    }

}