import GamaSource, { Helpers, Sprite } from "../GamaSource"
import BoxCollider2D from "../math/collision/BoxCollider2D";
import Collider from "../math/collision/Collider";
import Physic from "../math/physics/Physic";
import Vector2 from "../math/vector/Vector2"
import Component from "./components/Component";
import ComponentType from "./components/ComponentType";

export default class GameObject {

    public transform:Vector2 = new Vector2(0, 0);
    public layer:number = 1
    public tag:string = "not defined"

    protected visible:boolean = true

    private components: {[key:string]: Component} = {}
    private arguments = new Array<any>()
    private root:GameObject | null = null
    private nodes = new Array<GameObject>()
    private collidingObjects = new Array<GameObject>()

    public static create(obj: typeof GameObject) {

        GamaSource.GameObjects.push(new obj())

        GamaSource.GameObjects = GamaSource.GameObjects.sort((a,b) => a.layer - b.layer)

    }

    public destroy() {

        GamaSource.GameObjects = GamaSource.GameObjects.filter(obj => obj != this)

    }

    public getComponent(type:ComponentType) {

        return this.components[type] ?? null

    }

    public setComponent(type:ComponentType, component:Component) {

        this.components[type] = component

    }

    public static getElementByTag<T>(tag:string) {

        const obj =  GamaSource.GameObjects.filter(obj => obj.tag == tag)[0]

        return obj ? obj as T : null

    }

    public static getAllElementsByTag<T>(tag:string) {

        return GamaSource.GameObjects.filter(obj => obj.tag == tag) as T[]

    }

    protected addNode(obj: typeof GameObject, ...args:any[]) {

        const node = new obj()

        node.arguments = args
        node.setRoot(this)
        node.transform = this.transform

        this.nodes.push(node)

    }

    public getNode<T>(index:number) {

        return this.nodes[index] ? this.nodes[index] as T : null

    }

    public getNodeByTag<T>(tag:string) {

        const node = this.nodes.filter(node => node.tag == tag)[0] 

        return node ? node as T : null 

    }

    public getNodesByTag<T>(tag:string) {

        return this.nodes.filter(node => node.tag == tag) as T[]

    }

    public getNodes() {

        return this.nodes

    }

    protected setRoot(obj:GameObject) {

        this.root = obj

    }

    protected getRoot() {

        return this.root ?? this

    }

    protected getArgument(index:number) {

        return this.arguments[index]

    }

    protected getArguments() {

        return this.arguments

    }

    public gameStart() {

        this.start()

        const physics = this.getComponent("Physics") as Physic
        const collision = this.getComponent("Collision") as BoxCollider2D
        const rendering = this.getComponent("Rendering") as Sprite

        if (physics)
            physics.position = this.transform

        if (collision)
            collision.position = this.transform

        if (rendering)
            rendering.reference = this.transform

        for (let i = 0; i < this.nodes.length; i++)
            this.nodes[i].gameStart()

    }

    public start() {}

    public update() {}

    private onCollision() {

        const objs = GamaSource.GameObjects.filter(obj => obj.getComponent("Collision") && obj != this && obj != this.root)

        for (let i = 0;i < objs.length;i++) {
         
            const obj = objs[i]

            const collision = this.getComponent("Collision") as Collider

            const objCollision = obj.getComponent("Collision") as Collider

            if (collision && objCollision) {

                if (collision.isCollided(objCollision)) {

                    const physics = this.getComponent("Physics") as Physic

                    if (physics) {

                        physics.applyFriction()

                        physics.velocity.y = 0;
                        physics.position.y = objCollision.position.y - (this.getComponent("Rendering") as Sprite).getSize().height

                    }

                    if (!this.collidingObjects.includes(obj))
                        this.collidingObjects.push(obj)

                    this.onCollisionBetween(obj);

                } else if(this.collidingObjects.includes(obj)) {

                    this.collidingObjects = this.collidingObjects.filter(o => o != obj)
                    this.onCollisionExit(obj)

                }

            }

        }

    }

    protected onCollisionBetween(gameObject:GameObject) {


    }

    protected onCollisionExit(gameObject:GameObject) {



    }

    protected fixedUpdate() {


    }

    public gameUpdate() {

        this.update()

        const physics = this.getComponent("Physics") as Physic

        if (physics) {

            physics.update()
            this.fixedUpdate();

            this.transform = physics.position

        }

        const collision = this.getComponent("Collision") as Collider

        if (this.visible) {
           
            if (collision) {

                const sprite = this.getComponent("Rendering") as Sprite

                if (sprite) {
                    
                    collision.update(sprite.getSize())

                } else {

                    collision.update()

                }
                
                this.onCollision()

            }

            for (let i = 0; i < this.nodes.length; i++)
                this.nodes[i].gameUpdate()

        }

        if (collision)
            collision.position = this.transform

    }

    public render() {

        const sprite = this.getComponent("Rendering") as Sprite

        if (sprite && this.visible) {

            const collision = this.getComponent("Collision") as Collider
 
            if (collision instanceof BoxCollider2D && Helpers.config.collision) 
                Helpers.collsion(collision, this.collidingObjects.length > 0)

            sprite.render()

            for (let i = 0; i < this.nodes.length; i++)
                this.nodes[i].render()

            if (Helpers.config.position)
                Helpers.position(this.transform)

        }

    }

}