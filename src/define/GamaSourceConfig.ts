import { Camera } from "../GamaSource"

export default class GamaSourceConfig {

    maxFPS?:number
    background?:string
    imageSmoothingEnabled?:boolean
    camera?:typeof Camera

}