import GamaSource, { FrameComponent } from "../../GamaSource";
import GameVideo from "../../asset/video/GameVideo";
import VideoPlayerConfig from "../config/VideoPlayerConfig";

export default class VideoPlayer extends FrameComponent {

    public source: GameVideo

    constructor(frame:VideoPlayerConfig) {
        super(frame)
        this.source = GamaSource.ASSETS.get(frame.path) as GameVideo
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
        this.setAutoPlay(auto)
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