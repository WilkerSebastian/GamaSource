import { Mouse, Vector2 } from "../../GamaSource";
import FrameButtonConfig from "../config/FrameButtonConfig";
import FrameTextConfig from "../config/FrameTextConfig";
import FramePanel from "./FramePanel";
import FrameText from "./FrameText";

export default class FrameButton extends FramePanel{

    constructor(frame:FrameButtonConfig) {
        super(frame);
        this.isHover = true

        if (frame.text) {

            frame.father = this

            this.add(new FrameText(frame.text))

        }

    }

    protected hover(): void {

        this.brightness = 95
        this.childrens[0].setBrightness(95)

        this.setScale(new Vector2(1.1, 1.1))
        this.childrens[0].setScale(new Vector2(1.1,1.1))

        Mouse.setPointer(true)
    
    }

    protected outHover(): void {
        
        this.brightness = 100
        this.childrens[0].setBrightness(100)

        this.setScale(new Vector2(1,1))
        this.childrens[0].setScale(new Vector2(1,1))

        Mouse.setPointer(false)

    }

    public getText() {

        const text = this.childrens[0];
        
        if (!text || !(text instanceof FrameText)) {
            
            return null

        }

        return text

    }

    public setText(frame:FrameTextConfig | FrameText) {

        if (!(this.childrens[0] instanceof FrameText)) {

            this.childrens.push(frame instanceof FrameText ? frame : new FrameText(frame))
            return

        }

        if (frame instanceof FrameTextConfig) {
         
            this.childrens[0] = new FrameText(frame)
            return

        }

        this.childrens[0] = frame

    }

}