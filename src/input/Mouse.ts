import GamaSource from "../core/GamaSource";
import Vector2 from "../math/vector/Vector2";

export default abstract class Mouse {

    private static events = new Array<(mouse:MouseEvent) => void>
    public static position = Vector2.zero()
    private static mapper = new Map<string, boolean>
    private static pressed = false

    public static initialize() {

        document.addEventListener("mousemove", e => {

            this.position.set(e.clientX, e.clientY)

        })
        document.addEventListener("mousedown", e => {

            this.mapper.set("mouse " + e.button, true)
            this.pressed = true

        })
        document.addEventListener("mouseup", e => {

            this.mapper.set("mouse " + e.button, false)
            this.pressed = false

        })

    }

    public static addEventClick(ev:(mouse:MouseEvent) => void) {

        this.events.push(ev)

        document.addEventListener("mousedown", (m) => {

            this.mapper.set("mouse " + m.button, true)
            this.pressed = true

            this.events.forEach(e => {

                e(m)

            })

        })        

    }

    public static hasPressed() {

        return this.pressed

    }

    public static getButtonPressed(button:string | number) {

        if (typeof button == "number") {

            return this.mapper.get("mouse" + button)
            
        } 

        return this.mapper.get(button)

    }

    public static setPointer(pointer:boolean) {

        GamaSource.canvas.style.cursor = pointer ? "pointer" : "default"

    }

    public static getPositionRelativeRender() {

        return new Vector2(
            this.position.x - (GamaSource.window.WIDTH / 2),
            this.position.y - (GamaSource.window.HEIGHT / 2)
        ) 

    }

}