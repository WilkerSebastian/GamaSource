import Time from "../../define/TimeGame"

export default class TimeController {

    private DeltaTime: number;
    public FPS: number;
    
    private lastFrameTime: number;
    
    private frameCount: number;
    private fpsTimer: number;

    constructor(maxFPS: number = 60) { 
        this.DeltaTime = 0;
        this.FPS = 0;
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fpsTimer = 0;
    }

    public initFrame() {
        const now = performance.now();
        this.lastFrameTime = now;
        this.fpsTimer = now;
        this.frameCount = 0;
        this.FPS = 0;
        this.DeltaTime = 0;
    }

    public update() {
        
        const currentTime = performance.now();

        let msDelta = currentTime - this.lastFrameTime;

        if (msDelta > 100) 
            msDelta = 100;

        this.DeltaTime = msDelta / 1000; 

        this.lastFrameTime = currentTime;

        this.frameCount++;
        
        if (currentTime > this.fpsTimer + Time.SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.fpsTimer = currentTime;
        }

    }

    public getDeltaTime() {
        return this.DeltaTime; 
    }

}