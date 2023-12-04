import ratio from "../../define/ratio"
import FrameComponent from "../FrameComponent"

export default class FrameConfig {

    x:ratio = 0
    y:ratio = 0
    width:ratio = 0
    height:ratio = 0
    visible?:boolean
    father?:FrameComponent

}