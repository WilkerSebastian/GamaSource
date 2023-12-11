import GamaSource from "../../GamaSource"

export default class GameAudio {

    private source:HTMLAudioElement

    constructor(path:string) {

        this.source = new Audio()
        
        this.source.addEventListener("loadeddata", () => {

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

    public async playTo(start:number, end?:number) {

        const max_time = end ?? this.getDuration();

        this.source.currentTime = start

        this.source.addEventListener("timeupdate", () => {

            if (this.source.currentTime >= max_time)
                this.pause()

        })

        await this.play()

    }

    public getDuration() {

        return this.source.duration

    }

    public setVolume(volume:number) { 

        this.source.volume = volume / 100

    } 

    public getVolume() {

        return this.source.volume

    }

    public setAutoPlay(auto:boolean) {

        this.source.autoplay = auto

    }

    public async play() {

        await this.source.play()

    }

    public getSource() {

        return this.source

    }

}