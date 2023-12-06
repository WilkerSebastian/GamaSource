import GamaSource from "../../GamaSource"

export default class GameAudio {

    private source:HTMLAudioElement

    constructor(path:string) {

        this.source = new Audio()
        
        this.source.addEventListener("load", () => {

            GamaSource.LOAD++

        }) 

        this.source.src = path

        this.setVolume(50)

        const name = path.split("/")

        GamaSource.ASSETS.set(name[name.length - 1], this)

    }

    public pause() {

        this.source.pause()

    }

    public setLoop(loop:boolean) {

        this.source.loop = loop 

    }

    public setVolume(volume:number) { 

        this.source.volume = volume / 100

    } 

    public getVolume() {

        return this.source.volume

    }

    public async play() {

        await this.source.play()

    }

    public getSource() {

        return this.source

    }

}