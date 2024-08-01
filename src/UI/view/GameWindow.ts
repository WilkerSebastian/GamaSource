import GamaSource from "../../core/GamaSource"

export default class GameWindow {

    public HEIGHT:number
    public WIDTH:number

    private static EVENTS = new Array<() => void>()

    constructor() {

        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight

    }

    public size = {

        getWidth: (percentage:number) => this.WIDTH * (percentage / 100),
        getHeight: (percentage:number) => this.HEIGHT * (percentage / 100)

    }

    public addEvent(ev:() => void) {

        GameWindow.EVENTS.push(ev)

        window.addEventListener("resize", () => {

            this.WIDTH = window.innerWidth
            this.HEIGHT = window.innerHeight

            GameWindow.EVENTS.forEach(e => {

                e()

            })

            GamaSource.ctx.imageSmoothingEnabled = false

        })

    }

    public getScalableMeasure(scalar:number) {

        const scale = this.getMinSide() * 0.001

        return scale * scalar

    }

    public getMinSide() {

        return Math.min(GamaSource.window.WIDTH, GamaSource.window.HEIGHT)

    }

    public getScale() {

        return this.WIDTH / this.HEIGHT

    }
    
}