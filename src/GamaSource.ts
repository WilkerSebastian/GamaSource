import GamaSourceState from "./define/GamaSourceState"
import GamaSourceConfig from "./define/GamaSourceConfig"
import GameObject from "./gameObject/GameObject"
import KeyBoard from "./input/KeyBoard"
import TimeController from "./math/time/TimeController"
import GameCanvas from "./UI/view/GameCanvas"
import GameWindow from "./UI/view/GameWindow"
import TimeGame from "./define/TimeGame"
import Vector2 from "./math/vector/Vector2"
import Sprite from "./rendering/Sprite"
import ShapeSprite from "./rendering/material/ShapeSprite"
import SquareSprite from "./rendering/material/forms/SquareSprite"
import StaticSprite from "./rendering/spriteAsset/static/StaticSprite"
import GameMath from "./math/GameMath"
import GameAudio from "./asset/audio/GameAudio"
import GameImage from "./asset/image/GameImage"
import Loader from "./UI/view/Loader"
import Mouse from "./input/Mouse"
import FrameComponent from "./UI/FrameComponent"
import FramePanel from "./UI/components/FramePanel"
import FrameText from "./UI/components/FrameText"
import AnimationController from "./rendering/spriteAsset/animation/AnimationController"
import JsonAnimation from "./asset/data/JsonAnimation"
import SpriteSheet from "./rendering/spriteAsset/dynamic/SpriteSheet"
import RigidBody2D from "./math/collision/RigidBody2D"
import BoxCollider2D from "./math/collision/BoxCollider2D"

class GamaSource {

    public static LOAD:number = 0
    public static ASSETS = new Map<string , GameAudio | GameImage>
    public static GameObjects = new Array<GameObject>()
    public static ctx:CanvasRenderingContext2D
    public static window:GameWindow
    public static UI:FrameComponent
    public static globalEnv = new Map<string, any>()
    public static ReferenceGame: GamaSource

    private static canvas:HTMLCanvasElement

    private static state:GamaSourceState
    private time:TimeController

    private background:Sprite
    private scenes = new Map<string, () => void>()

    constructor(config?:GamaSourceConfig) {

        GamaSource.window = new GameWindow()

        const source = config?.background ?? "#F2F2F2"

        if (!Number.isNaN(parseInt(source.split("#").join(""), 16))) {

            this.background = new SquareSprite(new Vector2(0,0), GamaSource.window.WIDTH, GamaSource.window.HEIGHT, source)
            
        } else {

            const name = GamaSource.loader(source)[0]

            this.background = new StaticSprite(name, new Vector2(0,0), {width:GamaSource.window.WIDTH, height:GamaSource.window.HEIGHT})
    
        }

        GamaSource.UI = new FrameComponent({
            x:0,
            y:0,
            width:GamaSource.window.WIDTH,
            height:GamaSource.window.HEIGHT,
            visible:true
        })

        GamaSource.window.addEvent(() => {

            GamaSource.UI.setSize(GamaSource.window.WIDTH, GamaSource.window.HEIGHT)

            this.background.width = GamaSource.window.WIDTH
            this.background.height = GamaSource.window.HEIGHT

        })

        GameCanvas()
        Mouse.initialize()
        KeyBoard.initialize()

        this.time = new TimeController(config?.maxFPS ?? 60)

        GamaSource.state = GamaSourceState.CLOSED

        GamaSource.canvas = document.querySelector<HTMLCanvasElement>("#game") as HTMLCanvasElement

        GamaSource.ctx = GamaSource.canvas.getContext("2d") as CanvasRenderingContext2D
        GamaSource.ctx.imageSmoothingEnabled = config?.imageSmoothingEnabled ?? false

    }

    // métodos de incialização

    private start() {

        GamaSource.ReferenceGame = this

        const main = this.scenes.get("main")

        if (main) {

            main()
            
        } else {

            console.error("Error the main scene not found!");
            GamaSource.falied()
            return

        }

        Loader()

        GamaSource.GameObjects.forEach((g) => g.start())

    }

    private update() {

        GamaSource.globalEnv.set("deltaTime", this.time.getDeltaTime())
        GamaSource.globalEnv.set("latency", this.time.getFrameInterval())

        GamaSource.GameObjects.forEach((g) => g.gameUpdate())

        GamaSource.UI.FrameUpdate()

    }

    private render() {

        GamaSource.ctx.clearRect(0, 0, GamaSource.window.WIDTH, GamaSource.window.HEIGHT)

        this.background.render()

        GamaSource.ctx.beginPath()
        GamaSource.GameObjects.forEach((g) => {
            
            g.render()
            
        })
        GamaSource.ctx.closePath()

        GamaSource.UI.FrameRender()

    }

    private loop(currentTime:number) {

        try {
         
            if (GamaSource.state != GamaSourceState.CLOSED && GamaSource.state != GamaSourceState.CRASHED) {

                requestAnimationFrame((currentTime) => this.loop(currentTime));

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

    // métodos de controle

    public static loader(...assets:string[]) {

        let names:string[] = []

        assets.forEach(a => {

            const name = a.split("/")

            names.push(name[name.length - 1])

            if (!this.ASSETS.get(name[name.length - 1])) {
             
                if (/\.(mp3|wav|flac|ogg)$/i.test(a)) {

                    new GameAudio(a)
                    
                } else if(/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(a)) {
    
                    new GameImage(a)
                    
                }

            }

        })

        return names

    }

    public addScene(scene:string, performer:() => void) {

        if(!this.scenes.get(scene)) {
         
            this.scenes.set(scene, performer)
            return

        }

        console.error("Scene overwriting is not allowed!");
        GamaSource.falied()

    }

    public changeScene(scene:string) {

        const sc = this.scenes.get(scene)

        if(sc) {

            GamaSource.UI.setChildrens([])
            GamaSource.GameObjects = []

            sc()

            GamaSource.GameObjects.forEach((g) => g.start())            

            return

        }

        console.warn(`The scene ${scene} was not found`);

    }

}

export default GamaSource

// exportações para biblioteca
export {    
    GamaSource, 
    GamaSourceState, 
    TimeGame, 
    GamaSourceConfig,
    GameObject, 
    KeyBoard,
    Mouse,
    Vector2,
    TimeController,
    Sprite,
    ShapeSprite, 
    SquareSprite, 
    StaticSprite,
    RigidBody2D,
    BoxCollider2D,
    SpriteSheet,
    AnimationController,
    JsonAnimation,
    GameCanvas, 
    GameWindow,
    GameMath,
    FrameComponent,
    FramePanel,
    FrameText
};