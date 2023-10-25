import Time from "../../define/TimeGame"

export default class TimeController {

    public DeltaTime:number
    public FPS:number
    
    private frameInterval:number
    private lastFrameTime:number
    private frameCount:number

    constructor(maxFPS:number) {

        this.FPS = 0
        this.DeltaTime = 0
        this.lastFrameTime = performance.now()
        this.frameCount = 0
        this.frameInterval = Time.SECOND / maxFPS

    }

    public updateFrame(currentTime:number) {

        this.frameCount++;
        if (currentTime > this.lastFrameTime + Time.SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }

    }

    public updateLastFrame() {

        this.lastFrameTime = performance.now()

    }

    public setMaxFPS(maxFPS:number) {

        this.frameInterval = Time.SECOND / maxFPS

    }

    public getDeltaTime(currentTime?:number) {

        if (currentTime) {;
         
            return (currentTime - this.lastFrameTime) / Time.SECOND

        }

        return this.DeltaTime

    }

    public getFrameInterval() {

        return this.frameInterval

    }

}