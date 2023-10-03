import GamaSource from "../../GamaSource"

export default class GameImage {

    private source:HTMLImageElement

    constructor(path:string) {

        this.source = new Image()
        
        this.source.addEventListener("load", () => {

            GamaSource.LOAD++

        }) 

        this.source.src = path

        const name = path.split("/")

        GamaSource.ASSETS.set(name[name.length - 1], this)

    }

    public getSource() {

        return this.source

    }

}