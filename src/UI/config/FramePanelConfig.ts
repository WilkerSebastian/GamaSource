import FrameConfig from "./FrameConfig";

export default class FramePanelConfig extends FrameConfig {

    source?:string
    rounded?:number | DOMPointInit | Iterable<number | DOMPointInit>
    border?: {color?:string,size?:number}

}