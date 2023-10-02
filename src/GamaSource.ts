import GamaSourceState from "./define/GamaSoruceState"
import GamaSourceConfig from "./define/GamaSourceTime"
import GameOject from "./gameObject/GameObject"
import KeyBoard from "./input/KeyBoard"
import TimeController from "./math/TimeController"
import GameCanvas from "./UI/view/GameCanvas"
import GameWindow from "./UI/view/GameWindow"

export default class GamaSource {

    public static GameObjects = new Array<GameOject>()
    public static ctx:CanvasRenderingContext2D
    public static window:GameWindow

    private static canvas:HTMLCanvasElement

    private static state:GamaSourceState
    private time:TimeController

    public main = () => {}

    constructor(config?:GamaSourceConfig) {

        GamaSource.window = new GameWindow()

        GameCanvas()
        KeyBoard.initialize()

        this.time = new TimeController(config?.maxFPS ?? 60)

        GamaSource.state = GamaSourceState.CLOSED

        GamaSource.canvas = document.querySelector<HTMLCanvasElement>("#game") as HTMLCanvasElement

        GamaSource.ctx = GamaSource.canvas.getContext("2d") as CanvasRenderingContext2D

    }

    private start() {

         this.main()

        GamaSource.GameObjects.forEach((g) => g.start())

    }

    private update() {

        GamaSource.GameObjects.forEach((g) => g.update())

    }

    private render() {
        

        GamaSource.ctx.clearRect(0, 0, GamaSource.window.WIDTH, GamaSource.window.HEIGHT)

        GamaSource.GameObjects.forEach((g) => g.render())

    }

    private loop(currentTime:number) {

        try {
         
            if (GamaSource.state != GamaSourceState.CLOSED && GamaSource.state != GamaSourceState.CRASHED) {

                requestAnimationFrame((currentTime) => this.loop(currentTime))

                this.time.DeltaTime = this.time.getDeltaTime(currentTime)

                if (this.time.DeltaTime >= this.time.getFrameInterval()) return;
         
                if (GamaSource.state != GamaSourceState.STOPPED) {

                    this.update()

                }

                this.render()

                this.time.updateFrame(currentTime)
    
            }

        } catch (err) {
            
            console.error(err);

            GamaSource.state = GamaSourceState.CRASHED

        }

    }

    public run() {

         this.start()

        GamaSource.state = GamaSourceState.RUNNING;

        this.time.updateLastFrame()

        requestAnimationFrame((currentTime) => this.loop(currentTime))

    }

    public static stop() {

        GamaSource.state = GamaSourceState.STOPPED

    }

    public static resume() {

        GamaSource.state = GamaSourceState.RUNNING

    }

    public static exit() {

        GamaSource.state = GamaSourceState.CLOSED

    }
    public static falied() {

        GamaSource.state = GamaSourceState.CRASHED

    }

}