import { Sprite } from "../../GamaSource";
import Vector2 from "../vector/Vector2";
import Collider from "./Collider";

export default class colliderCollider2D extends Collider {

    public width:number;
    public height:number;
    public scale = new Vector2(1,1)

    constructor(width:number = 0, height:number = 0) {

        super();
        this.position = new Vector2(0, 0)
        this.width = width
        this.height = height

    }

    public override isCollided(collider:colliderCollider2D) {

        return (this.position.x < collider.position.x + collider.width &&
                this.position.x + this.width > collider.position.x &&
                this.position.y < collider.position.y + collider.height &&
                this.position.y + this.height > collider.position.y)

    }

    public override resolveCollision(collider: colliderCollider2D) {

        const dx = (this.position.x + this.width / 2) - (collider.position.x + collider.width / 2);
        const dy = (this.position.y + this.height / 2) - (collider.position.y + collider.height / 2);

        const overlapX = (this.width + collider.width) / 2 - Math.abs(dx);
        const overlapY = (this.height + collider.height) / 2 - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {

            if (overlapX < overlapY) {
                
                if (dx > 0)
                    return new Vector2(this.position.x + overlapX, this.position.y);

                return new Vector2(this.position.x - overlapX, this.position.y);
            } 

            if (dy > 0) 
                return new Vector2(this.position.x, this.position.y + overlapY);

            return new Vector2(this.position.x, this.position.y - overlapY);
        }

        return this.position

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