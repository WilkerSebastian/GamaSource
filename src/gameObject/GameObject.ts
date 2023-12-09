import GamaSource, { AnimationController, Helpers, RigidBody2D, Sprite, SpriteSheet, StaticSprite } from "../GamaSource"
import BoxCollider2D from "../math/collision/BoxCollider2D";
import Vector2 from "../math/vector/Vector2"

export default class GameObject {

    public transform:Vector2 = new Vector2(0, 0);
    public sprite: Sprite | AnimationController | null = null
    public collider: BoxCollider2D | null = null
    public physics: RigidBody2D | null = null
    public layer:number = 1
    public tag:string = "not defined"

    protected visible:boolean = true

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

        for (let i = 0; i < this.nodes.length; i++)
            this.nodes[i].gameStart()

    }

    public start() {}

    public update() {}

    private onCollision() {

        const objs = GamaSource.GameObjects.filter(obj => obj.collider && obj != this && obj != this.root)

        objs.forEach(obj => {

            if (this.collider?.isCollided(obj.collider as BoxCollider2D)) {

                if (this.physics && obj.collider) {

                    const over = this.collider.resolveCollision(obj.collider)

                    this.physics.applyFriction()

                    if (over.x != this.collider.position.x) {
                      
                        this.physics.velocity.x = 0;
                        this.physics.position = over
                        return

                    } 

                    this.physics.velocity.y = 0;
                    this.physics.position = over

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
            
            if (this.collider) {

                if (this.sprite instanceof StaticSprite || this.sprite instanceof SpriteSheet || this.sprite instanceof AnimationController ) {
                    
                    this.collider.update(this.transform, this.sprite.getSize())

                } else {

                    this.collider.update(this.transform)

                }
                
                this.onCollision()

            }

            this.update()

            if (this.physics) {
    
                this.physics.update(this)
                this.fixedUpdate()

            }

            for (let i = 0; i < this.nodes.length; i++)
                this.nodes[i].gameUpdate()

        }

    }

    public render() {

        if (this.sprite && this.visible) {
 
            if (this.collider && Helpers.config.collision) 
                Helpers.collsion(this.collider, this.collidingObjects.length > 0)

            this.sprite.render(this)

            for (let i = 0; i < this.nodes.length; i++)
                this.nodes[i].render()

            if (Helpers.config.position)
                Helpers.position(this.transform)

        }

    }

}