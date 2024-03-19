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

    private components = new Map<ComponentType, Component>
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

        return this.components.get(type) ?? null

    }

    public setComponent(type:ComponentType, component:Component) {

        this.components.set(type, component)

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

        if (physics) {

            physics.position = physics.position.isNullVector() ? this.transform : physics.position
            this.setComponent("Physics", physics)

        }

        for (let i = 0; i < this.nodes.length; i++)
            this.nodes[i].gameStart()

    }

    public start() {}

    public update() {}

    private onCollision() {

        const objs = GamaSource.GameObjects.filter(obj => obj.getComponent("Collision") && obj != this && obj != this.root)

        objs.forEach(obj => {

            const collision = this.getComponent("Collision") as Collider

            const objCollision = this.getComponent("Collision") as Collider

            if (!collision || !objCollision)
                return

            if (collision.isCollided(objCollision)) {

                const physics = this.getComponent("Physics") as Physic

                if (physics) {

                    const over = collision.resolveCollision(objCollision)

                    physics.applyFriction()

                    if (over.x != collision.position.x) {
                      
                        physics.velocity.x = 0;
                        physics.position = over
                        return

                    } 

                    physics.velocity.y = 0;
                    physics.position = over

                }

                if (!this.collidingObjects.includes(obj))
                    this.collidingObjects.push(obj)

                this.onCollisionBetween(obj);

            } else if(this.collidingObjects.includes(obj)) {

                this.collidingObjects = this.collidingObjects.filter(o => o != obj)
                this.onCollisionExit(obj)

            }

        })

    }

    protected onCollisionBetween(gameObject:GameObject) {


    }

    protected onCollisionExit(gameObject:GameObject) {



    }

    protected fixedUpdate() {


    }

    public gameUpdate() {

        if (this.visible) {

            const collision = this.getComponent("Collision") as Collider
            
            if (collision) {

                const sprite = this.getComponent("Rendering") as Sprite

                if (sprite) {
                    
                    collision.update(this.transform, sprite.getSize())

                } else {

                    collision.update(this.transform)

                }
                
                this.onCollision()

            }

            this.update()

            const physics = this.getComponent("Physics") as Physic

            if (physics) {
    
                physics.update()
                this.fixedUpdate();

            }

            for (let i = 0; i < this.nodes.length; i++)
                this.nodes[i].gameUpdate()

        }

    }

    public render() {

        const sprite = this.getComponent("Rendering") as Sprite

        if (sprite && this.visible) {

            const collision = this.getComponent("Collision") as Collider
 
            if (collision instanceof BoxCollider2D && Helpers.config.collision) 
                Helpers.collsion(collision, this.collidingObjects.length > 0)

            sprite.render(this)

            for (let i = 0; i < this.nodes.length; i++)
                this.nodes[i].render()

            if (Helpers.config.position)
                Helpers.position(this.transform)

        }

    }

}