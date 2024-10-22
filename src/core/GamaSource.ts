import GamaSourceState from "../define/GamaSourceState"
import GamaSourceConfig from "../define/GamaSourceConfig"
import GameObject from "../gameObject/GameObject"
import KeyBoard from "../input/KeyBoard"
import TimeController from "../math/time/TimeController"
import GameCanvas from "../UI/view/GameCanvas"
import GameWindow from "../UI/view/GameWindow"
import GameAudio from "../asset/audio/GameAudio"
import GameImage from "../asset/image/GameImage"
import Loader from "../UI/view/Loader"
import Mouse from "../input/Mouse"
import FrameComponent from "../UI/FrameComponent"
import FramePanel from "../UI/components/FramePanel"
import Camera from "../gameObject/Camera"
import GameVideo from "../asset/video/GameVideo"
import Helpers from "../helper/Helpers"
import Gamepads from "../input/Gamepads"

class GamaSource {

    public static LOAD:number = 0
    public static ASSETS = new Map<string , GameAudio | GameImage | GameVideo>
    public static GameObjects = new Array<GameObject>()
    public static ctx:CanvasRenderingContext2D
    public static window:GameWindow
    public static UI:FrameComponent
    public static globalEnv = new Map<string, any>()
    public static Camera:Camera
    public static canvas:HTMLCanvasElement

    private static state:GamaSourceState
    private time:TimeController

    private background:FramePanel
    private static scenes = new Map<string, () => void>()
    
    private firstScene = "main"

    private static AnimationFrameID:number

    constructor(config?:GamaSourceConfig) {

        GamaSource.window = new GameWindow()

        const source = config?.background ?? "#F2F2F2"

        this.background = new FramePanel({
            x: 0,
            y: 0,
            width : GamaSource.window.WIDTH,
            height: GamaSource.window.HEIGHT,
            source: source,
            visible: true
        })

        GamaSource.UI = new FrameComponent({
            x:0,
            y:0,
            width:GamaSource.window.WIDTH,
            height:GamaSource.window.HEIGHT,
            visible:true
        })

        GamaSource.window.addEvent(() => {

            GamaSource.UI.setSize(GamaSource.window.WIDTH, GamaSource.window.HEIGHT)

            this.background.setWidth(GamaSource.window.WIDTH)
            this.background.setHeight(GamaSource.window.HEIGHT)

        })

        GameCanvas()
        KeyBoard.initialize()
        Mouse.initialize()
        Gamepads.initialize()

        this.time = new TimeController(config?.maxFPS ?? 60)

        GamaSource.state = GamaSourceState.CLOSED

        GamaSource.canvas = document.querySelector<HTMLCanvasElement>("#game") as HTMLCanvasElement

        GamaSource.ctx = GamaSource.canvas.getContext("2d") as CanvasRenderingContext2D
        GamaSource.ctx.imageSmoothingEnabled = config?.imageSmoothingEnabled ?? false

        if (config?.camera) {

            GamaSource.Camera = new config.camera()
            
        } else {

            GamaSource.Camera = new Camera()

            GamaSource.Camera.reset()

        }

        window.addEventListener('focus', () => {

            if (GamaSource.state == GamaSourceState.STOPPED) 
                GamaSource.resume()
        
        });
        window.addEventListener('blur', () => GamaSource.stop());

    }

    // métodos de incialização

    private start() {

        const main = GamaSource.scenes.get(this.firstScene)

        if (main) {

            main()
            
        } else {

            console.error(`Error the ${this.firstScene} scene not found!`);
            GamaSource.falied()
            return

        }

        Loader()

        GamaSource.GameObjects.forEach((g) => g.gameStart())

        GamaSource.UI.FrameStart()

    }

    private update() {

        Gamepads.update()

        GamaSource.globalEnv.set("FPS", this.time.FPS)
        GamaSource.globalEnv.set("deltaTime", this.time.getDeltaTime())
        GamaSource.globalEnv.set("latency", this.time.getFrameInterval())

        GamaSource.GameObjects.forEach((g) => g.gameUpdate())

        GamaSource.UI.FrameUpdate()

    }

    private render() {

        GamaSource.ctx.clearRect(0, 0, GamaSource.window.WIDTH, GamaSource.window.HEIGHT)

        this.background.FrameRender()

        GamaSource.ctx.save()
        
        if (GamaSource.Camera) {
         
            GamaSource.Camera.followObject()

            GamaSource.Camera.render()

        }

        Helpers.preRender()

        GamaSource.GameObjects.forEach((g) => {
            
            g.render()
            
        })
        
        GamaSource.ctx.restore()

        Helpers.render()

        GamaSource.UI.FrameRender()

    }

    private loop() {

        try {

            GamaSource.AnimationFrameID = requestAnimationFrame(() => this.loop())
         
            if (GamaSource.state != GamaSourceState.CLOSED && GamaSource.state != GamaSourceState.CRASHED) {

                this.time.updateDeltaTime()

                if (this.time.deltaTimeIsGreaterThenFrameInterval()) {
         
                    if (GamaSource.state != GamaSourceState.STOPPED) {

                        this.update()

                    }

                    this.render()
                    this.time.frameUpdate()       

                }

            }

        } catch (err) {
            
            console.error(err);

            GamaSource.state = GamaSourceState.CRASHED

        }

    }

    public run(firstScene?:string) {

        if (firstScene)
            this.firstScene = firstScene;

        this.start()

        GamaSource.state = GamaSourceState.RUNNING;

        this.time.initFrame()

        this.loop()

    }

    public static stop() {

        this.state = GamaSourceState.STOPPED

    }

    public static resume() {

        this.state = GamaSourceState.RUNNING

    }

    public static exit() {

        this.state = GamaSourceState.CLOSED

    }
    public static falied() {

        this.state = GamaSourceState.CRASHED

    }

    // métodos de controle

    public loader(...assets:string[]) {
        GamaSource.loader(...assets)
    }

    public static loader(...assets:string[]) {

        let names:string[] = []

        assets.forEach(a => {

            const name = a.split("/")

            names.push(name[name.length - 1])

            if (!this.ASSETS.get(name[name.length - 1])) {
             
                if (/\.(mp3|wav|flac|ogg)$/i.test(a)) {

                    new GameAudio(a)
                    
                } else if(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(a)) {
    
                    new GameImage(a)
                    
                } else if(/\.(mp4|mov|avi|mkv|wmv|flv|webm|ogg)$/i.test(a)) {

                    new GameVideo(a)

                }

            }

        })

        return names

    }

    public addScene(scene:string, performer:() => void) {

        GamaSource.addScene(scene, performer)

    }

    public changeScene(scene:string) {

        return GamaSource.changeScene(scene)

    }

    public static addScene(scene:string, performer:() => void) {

        if(!this.scenes.get(scene)) {
         
            this.scenes.set(scene, performer)
            return

        }

        console.error("Scene overwriting is not allowed!");
        this.falied()

    }

    public static changeScene(scene:string) {

        const sc = this.scenes.get(scene)

        if(sc) {

            this.UI.setChildrens([])
            this.GameObjects = []

            sc()    

            this.GameObjects.forEach((g) => g.gameStart())

            return

        }

        console.warn(`The scene ${scene} was not found`);

    }

    public static getCurrentScene() {

        return this.globalEnv.get("current_scene")

    }

    public getCurrentScene() {

        return GamaSource.getCurrentScene()

    }

}

export default GamaSource