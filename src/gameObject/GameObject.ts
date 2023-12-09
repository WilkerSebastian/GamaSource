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

    private collidingObjects = new Array<GameObject>()

    public static create(obj: typeof GameObject) {

        GamaSource.GameObjects.push(new obj())

        GamaSource.GameObjects = GamaSource.GameObjects.sort((a,b) => a.layer - b.layer)

    }

    public destroy() {

        GamaSource.GameObjects = GamaSource.GameObjects.filter(obj => obj != this)

    }

    public static getElementByTag<T>(tag:string) {

        return GamaSource.GameObjects.filter(obj => obj.tag == tag)[0] as T

    }

    public static getAllElementsByTag<T>(tag:string) {

        return GamaSource.GameObjects.filter(obj => obj.tag == tag) as T

    }

    public start() {}

    public update() {}

    private onCollision() {

        const objs = GamaSource.GameObjects.filter(obj => obj.collider && obj != this)

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

            }

        }

    }

    public render() {

        if (this.sprite && this.visible) {
 
            if (this.collider && Helpers.config.collision) {
                
                Helpers.collsion(this.collider, this.collidingObjects.length > 0)

            }

            this.sprite.render(this)

            if (Helpers.config.position) {
                
                Helpers.position(this.transform)

            }

        }

    }

}