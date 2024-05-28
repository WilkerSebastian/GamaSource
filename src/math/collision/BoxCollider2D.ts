import { Sprite } from "../../GamaSource";
import Vector2 from "../vector/Vector2";
import CircularCollider from "./CircularCollider";
import Collider from "./Collider";

export default class BoxCollider2D extends Collider {

    public width:number;
    public height:number;

    constructor(width:number = 0, height:number = 0) {

        super();
        this.position = Vector2.zero()
        this.width = width
        this.height = height

    }

    public override isCollided(collider:Collider): boolean {

        if (collider instanceof CircularCollider)
            return collider.isCollided(this);

        else if (collider instanceof BoxCollider2D)
            return (this.position.x < collider.position.x + collider.width &&
                this.position.x + this.width > collider.position.x &&
                this.position.y < collider.position.y + collider.height &&
                this.position.y + this.height > collider.position.y);

        return false

    }

    public override resolveCollision(collider: Collider): Vector2 {

        if (collider instanceof CircularCollider) 
            return collider.resolveCollision(this)

        else if (collider instanceof BoxCollider2D) {

            const distance = new Vector2(
                (this.position.x + this.width / 2) - (collider.position.x + collider.width / 2),
                (this.position.y + this.height / 2) - (collider.position.y + collider.height / 2)
            );

            const half = new Vector2(
                (this.width + collider.width) / 2,
                (this.height + collider.height) / 2
            );

            const overlay = half.subtract(new Vector2(
                Math.abs(distance.x),
                Math.abs(distance.y)
            ));

            if (overlay.x < overlay.y) 
                return new Vector2(distance.x < 0 ? -overlay.x : overlay.x, 0);
           
            return new Vector2(0, distance.y < 0 ? -overlay.y : overlay.y);
            
        }

        return Vector2.zero()

    }

    public override update() {

        let sprite:Sprite

        if (this.reference instanceof Vector2) {

            this.position = this.reference
            return

        } 
        
        sprite = this.reference.getComponent("Rendering") as Sprite

        if (!sprite) {
            
            this.position = this.reference.transform

            return

        }

        this.position = this.reference.transform
        this.width = sprite.width * this.scale.x
        this.height = sprite.height * this.scale.y

    }   

}