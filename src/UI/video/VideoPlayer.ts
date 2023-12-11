import GamaSource, { FrameComponent } from "../../GamaSource";
import GameVideo from "../../asset/video/GameVideo";
import VideoPlayerConfig from "../config/VideoPlayerConfig";

export default class VideoPlayer extends FrameComponent {

    public source: GameVideo

    constructor(frame:VideoPlayerConfig) {
        super(frame)

        const video = GamaSource.ASSETS.get(frame.source) as GameVideo | undefined

        if (video) {
            
            this.source = video
            this.setAutoPlay(frame.autoPlay ?? false)
            this.setVolume(frame.volume ?? 50)
            return

        }

        this.source = new GameVideo("not found")
        console.error(`The video ${frame.source} was not found`);

    }

    public setEventEnd(event:() => void) {

        this.source.getSource().addEventListener("ended", () => event())

    }

    public async playTo(start:number, end?:number) {
        this.visible = true
        await this.source.playTo(start, end)
    }

    public async play() {

        this.visible = true
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

    public render() {

        GamaSource.ctx.drawImage(this.source.getSource(),
        this.position.x,
        this.position.y,
        this.width,
        this.height)

    }

}