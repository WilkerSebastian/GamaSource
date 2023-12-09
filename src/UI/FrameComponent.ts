import GamaSource, { Mouse, Vector2 } from "../GamaSource"
import ratio from "../define/ratio"
import FrameConfig from "./config/FrameConfig"

export default class FrameComponent {

    private static first = true
    private father:FrameComponent | null = null
    protected childrens = new Array<FrameComponent>()
    private scale = new Vector2(1,1);
    protected brightness = 100
    protected position:Vector2 = new Vector2(0, 0)
    protected width:number = 0
    protected height:number = 0
    protected isHover = false
    private hoverState = false
    private clickState = false
    protected visible = false

    constructor(frame:FrameConfig) {

        if (frame.father) {
            
            this.setFather(frame.father)

        } else if(!FrameComponent.first) {

            this.setFather(GamaSource.UI)

        } else {

            FrameComponent.first = false

        }

        this.setBounds(frame.x, frame.y, frame.width, frame.height)
        this.visible = frame.visible ?? false

        Mouse.addEventClick((ev) => this.hasClicked(ev))

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

    public setY(y:ratio) {

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
        this.setY(y)

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

        if (!frame.father) {
         
            frame.setFather(this)

            frame.setBounds(frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight())

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

    public getX() {

        return this.position.x

    }

    public getY() {

        return this.position.y

    }

    public FrameRender() {

        if (this.visible) {
         
            this.render()

            this.childrens.forEach((e) => {

                if (e.visible) {
                    
                    e.FrameRender()

                }

            })

        }

    }

    protected onClick() {


    }

    protected upClick() {



    }

    private hasClicked(ev: MouseEvent) {
         
        if (this.position.x < ev.clientX + 1 &&
            this.position.x + this.width > ev.clientX &&
            this.position.y < ev.clientY + 1 &&
            this.position.y + this.height > ev.clientY) {
                
            this.onClick()
            this.clickState = true
    
        }

    }

    protected hover() {



    }

    protected outHover() {



    }

    private hasHovered() {

        if (this.position.x < Mouse.transform.x + 1 &&
            this.position.x + this.width > Mouse.transform.x &&
            this.position.y < Mouse.transform.y + 1 &&
            this.position.y + this.height > Mouse.transform.y) {
                
            if (!this.hoverState) {
             
                this.hover()
                this.hoverState = true

            }
            return
    
        } 
        
        if (this.hoverState) {
         
            this.outHover()
            this.hoverState = false

        }

    } 

    public FrameUpdate() {

        this.update()

        if (this.clickState && !Mouse.hasPressed()) {
            
            this.clickState = false
            this.upClick()

        }
        
        if (this.isHover) {
            
            this.hasHovered()

        }

        this.childrens.forEach((e) => {

            e.FrameUpdate()

        })

    }

    public FrameStart() {

        this.start()

        this.childrens.forEach(e => {
            
            e.FrameStart()

        });

    }

    protected update() {


    }

    public getChildrens() {

        return this.childrens

    }

    public setChildrens(childrens:FrameComponent[]) {

        this.childrens = childrens

    }

    protected start() {


    };

    protected render() {


    };

    public setBrightness(brightness:number) {
        this.brightness = brightness
    }

    public getBrightness() {
        return this.brightness
    }

    public setScale(scale:Vector2) {
        this.scale = scale
    }

    public setScaleX(x:number) {
        this.scale.x = x
    }

    public setScaleY(y:number) {
        this.scale.y = y
    }

    public getScale() {
        return this.scale
    }

    public getScaleX() {
        return this.scale.x
    }

    public getScaleY() {
        return this.scale.y
    }

}