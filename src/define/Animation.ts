import Slice from "../rendering/spriteAsset/dynamic/Slice"

export default interface Animation {

    name: string
    source: string
    pixel: number | {width:number, height:number}
    slices: Slice[]
    stagger?: number

}