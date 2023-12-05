import GamaSource from "../../GamaSource";
import ratio from "../../define/ratio";
import FrameComponent from "../FrameComponent";
import FrameTextConfig from "../config/FrameTextConfig";

export default class FrameText extends FrameComponent {

    private lines:string[] = []
    private fontSize:number = 0
    private font:string = ""
    private color:string

    constructor(frame: FrameTextConfig) {
        super({
            x:frame.x,
            y:frame.y,
            width: frame.width,
            height: 0,
            visible: frame.visible,
            father: frame.father
        });

        this.color = frame.color ?? "#000"

        this.setFontSize(frame.fontSize ?? 11)
        this.setFont(frame.font ?? "ARIAL")

        this.setText(frame.text ?? "")

    }

    protected render() {

        GamaSource.ctx.save()

        GamaSource.ctx.filter = `brightness(${this.brightness}%)`
        
        this.lines.forEach((line, index) => {

            GamaSource.ctx.font = `${this.getFontSize() * Math.max(this.getScaleX(), this.getScaleY())}px ${this.getFont()}`
            GamaSource.ctx.fillStyle = this.color
            GamaSource.ctx.fillText(line, this.getPosition().x, this.getPosition().y * (index + 1), this.getWidth())

        })

        GamaSource.ctx.restore()

    }

    public setText(text:string) {

        const lines:string[] = []

        const l = text.trim().split(" ")

        let line = ""

        for (let index = 0; index < l.length; index++) {

            const word = l[index]

            if(word.length * this.fontSize > this.getWidth()) {

                lines.push(line.trim())
                line = word

            } else {

                line += word + " "

            }

            if(index == l.length - 1 && line) {

                lines.push(line.trim())

            }

        }
        
        this.setHeight(this.getFontSize() * lines.length)
        this.lines = lines.filter(word => word)

    }

    public getText() {

        return this.lines.join(" ")

    }

    public setFontSize(fontSize:ratio) {

        const fs = parseInt(fontSize.toString())

        const width = this.getFather()?.getWidth()

        if (typeof fontSize == "string" && width) {

            this.fontSize = width * (fs / 100)
            return
        }

        this.fontSize = fs

    }

    public getFontSize() {

        return this.fontSize

    }

    public setFont(font:string) {

        this.font = font

    }

    public getFont() {

        return this.font
    }

}