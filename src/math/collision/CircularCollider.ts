import { BoxCollider2D, GameMath } from "../../GamaSource";
import Sprite from "../../rendering/Sprite";
import Vector2 from "../vector/Vector2";
import Collider from "./Collider";


export default class CircularCollider extends Collider {

    public radius:number;

    constructor(radius = 0) {
        super()
        this.radius = radius

    }

    public override isCollided(collider: Collider): boolean {

        if (collider instanceof CircularCollider) {
        
            const distance = Vector2.distanceTo(collider.position, this.position)
            const combinedRadius = this.radius + collider.radius;

            return distance <= combinedRadius;

        } else if (collider instanceof BoxCollider2D) {

            const closet = new Vector2(
                Math.max(collider.position.x, Math.min(this.position.x, collider.position.x + collider.width)),
                Math.max(collider.position.y, Math.min(this.position.y, collider.position.y + collider.height))
            )

            const distance = this.position.dotProduct(closet)

            return distance <= Math.pow(this.radius, 2);

        }

        return false

    }

    public resolveCollision(collider: Collider): Vector2 {
        
        if (collider instanceof CircularCollider) {

            const dx = collider.position.x - this.position.x;
            const dy = collider.position.y - this.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const overlap = (this.radius + collider.radius) - distance;

            return new Vector2(
                (dx / distance) * overlap / 2,
                (dy / distance) * overlap / 2
            );

            
        } else if (collider instanceof BoxCollider2D) {

            const nearestX = Math.max(collider.position.x, Math.min(this.position.x, collider.position.x + collider.width));
            const nearestY = Math.max(collider.position.y, Math.min(this.position.y, collider.position.y + collider.height));

            const dx = this.position.x - nearestX;
            const dy = this.position.y - nearestY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const overlap = this.radius - distance;

            const ux = dx / distance;
            const uy = dy / distance;

            const moveAmount = overlap / 2;

            return new Vector2(
                ux * moveAmount,
                uy * moveAmount
            )

        }

        return Vector2.zero()

    }
    
    public update(): void {
        
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
        this.radius = Math.max(this.scale.x, this.scale.y) * (Math.max(sprite.width, sprite.height) / 2)

    }



}