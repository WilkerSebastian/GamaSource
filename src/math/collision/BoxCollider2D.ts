import GamaSource from "../../core/GamaSource";
import Sprite from "../../rendering/Sprite";
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
            return collider.resolveCollision(this);

        else if (collider instanceof BoxCollider2D) {

            if (collider.reference instanceof Vector2 || this.reference instanceof Vector2)
                return Vector2.zero()

            const size = (this.reference.getComponent("Rendering") as Sprite).getSize();
            const csize = (collider.reference.getComponent("Rendering") as Sprite).getSize();

            const distance = new Vector2(
                (this.position.x + size.width / 2) - (collider.position.x + csize.width / 2),
                (this.position.y + size.height / 2) - (collider.position.y + csize.height / 2)
            );
    
            const halfWidths = (size.width + csize.width) / 2;
            const halfHeights = (size.height + csize.height) / 2;
                
            // TODO: remove 1.49 constant
            const overlapX = halfWidths - Math.abs(distance.x * 1.49);
            const overlapY = halfHeights - Math.abs(distance.y * 1.49);

            if (overlapX < overlapY) {
                
                if (distance.x > 0) 
                    this.position.x += overlapX; 
                
                else 
                    this.position.x -= overlapX;
                    
                return new Vector2(overlapX, 0);

            } else {
                
                if (distance.y > 0) 
                    this.position.y += overlapY; 

                else 
                    this.position.y -= overlapY; 
                
                return new Vector2(0, overlapY); 

            }

        }

        return Vector2.zero();
    
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

        const { width, height } = sprite.getRenderObject()

        this.position.copy(this.reference.transform)
        this.width = width * this.scale.x
        this.height = height * this.scale.x

    }   

}