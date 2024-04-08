import Time from "../../define/TimeGame"

export default class TimeController {

    public DeltaTime:number
    public FPS:number
    
    private frameInterval:number
    private lastFrameTime:number
    private frameCount:number
    private currentTime:number

    constructor(maxFPS:number) {

        this.FPS = 0
        this.DeltaTime = 0
        this.lastFrameTime = 0
        this.currentTime = 0
        this.frameCount = 0
        this.frameInterval = Time.SECOND / maxFPS

    }

    public initFrame() {

        this.lastFrameTime = performance.now()

    }

    public frameUpdate() {

        this.frameCount++

        if (this.currentTime > this.lastFrameTime + Time.SECOND) {

            this.FPS = this.frameCount

            this.frameCount = 0
            this.lastFrameTime = this.currentTime - (this.DeltaTime % this.frameInterval)

        }

    }

    public deltaTimeIsGreaterThenFrameInterval() {

        return this.DeltaTime > this.frameInterval

    }

    public updateDeltaTime() {

        this.currentTime = performance.now()

        this.DeltaTime += (this.currentTime - this.lastFrameTime) / this.frameInterval  

    }

    public setMaxFPS(maxFPS:number) {

        this.frameInterval = Time.SECOND / maxFPS

    }

    public getDeltaTime() {

        return this.DeltaTime

    }

    public getFrameInterval() {

        return this.frameInterval

    }

}