import { Vector2 } from "../GamaSource"
import ratio from "../define/ratio"

export default class FrameComponent {

    private father:FrameComponent | null = null
    private childrens = new Array<FrameComponent>()
    protected position:Vector2 = new Vector2(0, 0)
    protected width:number = 0
    protected height:number = 0
    protected visible = false

    constructor(frame: {x:ratio, y:ratio, width:ratio, height:ratio, visible?:boolean, father?:FrameComponent}) {

        if (frame.father) {
            
            this.setFather(frame.father)

        }

        this.setBounds(frame.x, frame.y, frame.width, frame.height)
        this.visible = frame.visible ?? false

    }

    public setX(x:ratio) {

        const px = parseInt(x.toString())

        if (this.father) {
         
            if (typeof x == "string") {

                this.position.x = this.father.position.x + (this.father.width * (px / 100))
                return
                
            }
    
            this.position.x = this.father.position.x + px

        }

        this.position.x = px

    }

    public sety(y:ratio) {

        const py = parseInt(y.toString())

        if (this.father) {
         
            if (typeof y == "string") {

                this.position.y = this.father.position.y + (this.father.height * (py / 100))
                return
                
            }
    
            this.position.y = this.father.position.y + py

        }

        this.position.y = py
        
    }

    public setWidth(width:ratio) {

        const pw = parseInt(width.toString())
        
        if (this.father && typeof width == "string") {

            this.width = this.father.getWidth() * (pw / 100)
            return

        }

        this.width = pw

    }

    public setHeight(height:ratio) {

        const ph = parseInt(height.toString())

        if (this.father && typeof height == "string") {

            this.height = this.father.getHeight() * (ph / 100)
            return

        }

        this.height = ph

    }

    public setPosition(x:ratio, y:ratio) {

        this.setX(x)
        this.sety(y)

    }

    public setSize(width:ratio, height:ratio) {

        this.setWidth(width)
        this.setHeight(height)

    }

    public setBounds(x:ratio, y:ratio, width:ratio, height:ratio) {

        this.setPosition(x, y)
        this.setSize(width, height)

    }

    public add(frame:FrameComponent) {

        if (!this.father) {
         
            frame.setFather(this)

        }

        this.childrens.push(frame)

    }

    public setFather(frame:FrameComponent) {

        this.father = frame

    }

    public getFather() {

        return this.father

    }

    public getPosition() {

        return this.position

    }

    public getWidth() {
        
        return this.width

    }

    public getHeight() {

        return this.height

    }

    public FrameRender() {

        if (this.visible) {
         
            this.render()

            this.childrens.forEach((e) => {

                if (e.visible) {
                    
                    e.render()

                }

            })

        }

    }

    public FrameUpdate() {

        this.update()

        this.childrens.forEach((e) => {

            e.update()

        })

    }

    protected update() {


    }

    public getChildrens() {

        return this.childrens

    }

    public setChildrens(childrens:FrameComponent[]) {

        this.childrens = childrens

    }

    protected render() {


    };


}