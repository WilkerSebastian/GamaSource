import GamaSource from "../../GamaSource"
import GameAudio from "./GameAudio"

export default class AudioPlayer {

    private source:GameAudio

    constructor(source:string, volume?:number, autoPlay?:boolean) {

        const audio = GamaSource.ASSETS.get(source) as GameAudio | undefined

        if (audio) {
            
            this.source = audio
            this.setVolume(volume ?? 50)
            this.setAutoPlay(autoPlay ?? false)
            return

        }

        this.source = new GameAudio("not found")
        console.error(`The video ${source} was not found`);

    }

    public setEventEnd(event:() => void) {

        this.source.getSource().addEventListener("ended", () => event())

    }

    public async playTo(start:number, end?:number) {
        
        await this.source.playTo(start, end)
    }

    public async play() {

        await this.source.play()

    }

    public setAutoPlay(auto:boolean) {
        this.source.setAutoPlay(auto)
    }

    public pause() {

        this.source.pause()

    }

    public setVolume(volume:number) {

        this.source.setVolume(volume)

    }

    public getVolume() {

        return this.source.getVolume()

    }

    public getDuration() {

        return this.source.getDuration()

    }


}