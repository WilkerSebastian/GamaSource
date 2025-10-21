import Collider from "./Collider";
import GameObject from "../../gameObject/GameObject";
import Physic from "../physics/Physic";
import RigidBody2D from "../physics/RigidBody2D";
import BoxCollider2D from "./BoxCollider2D";
import CircularCollider from "./CircularCollider";

export default class CollisionManager {

    private colliders: Collider[] = [];
    
    private lastFrameCollisions: Map<Collider, Collider[]> = new Map();

    public add(collider: Collider) {

        this.colliders.push(collider);

    }

    public remove(collider: Collider) {

        this.colliders = this.colliders.filter(c => c !== collider);
        this.lastFrameCollisions.delete(collider);

    }

    private updateColliderPositions() {

        for (const collider of this.colliders) 
            collider.update();
        
    }
    
    public checkAndResolveCollisions() {
        
        this.updateColliderPositions();

        const currentFrameCollisions = new Map<Collider, Collider[]>();
        
        for (let i = 0; i < this.colliders.length; i++) {

            const colliderA = this.colliders[i];
            
            if (!(colliderA.reference instanceof GameObject)) 
                continue;

            for (let j = i + 1; j < this.colliders.length; j++) {

                const colliderB = this.colliders[j];

                if (!(colliderB.reference instanceof GameObject)) 
                    continue;
                
                if (colliderA.isCollided(colliderB)) {
                    
                    if (!currentFrameCollisions.has(colliderA)) 
                        currentFrameCollisions.set(colliderA, []);

                    if (!currentFrameCollisions.has(colliderB)) 
                        currentFrameCollisions.set(colliderB, []);

                    currentFrameCollisions.get(colliderA)!.push(colliderB);
                    currentFrameCollisions.get(colliderB)!.push(colliderA);
                    
                    this.resolveCollision(colliderA, colliderB);

                    this.notifyCollision(colliderA, colliderB, this.lastFrameCollisions);

                }

            }

        }
        
        this.notifyCollisionExit(this.lastFrameCollisions, currentFrameCollisions);

        this.lastFrameCollisions = currentFrameCollisions;

    }

    private resolveCollision(colliderA: Collider, colliderB: Collider): void {
        
        const physicA = (colliderA.reference as GameObject).getComponent("Physics") as Physic;
        const physicB = (colliderB.reference as GameObject).getComponent("Physics") as Physic;

        if (!(physicA instanceof RigidBody2D) && !(physicB instanceof RigidBody2D)) 
            return;

        const resolve = colliderA.resolveCollision(colliderB);

        if (physicA instanceof RigidBody2D) {

            if (colliderA instanceof BoxCollider2D)
                colliderB instanceof CircularCollider ? physicA.position.subtractInPlace(resolve) : physicA.position.addInPlace(resolve);
            
            else if (colliderA instanceof CircularCollider)
                physicA.position.addInPlace(resolve);

            if (resolve.y !== 0) {
            
                physicA.velocity.y = 0;
                physicA.position.y += resolve.y;
            
                if (resolve.y > 0) 
                    physicA.grounded = true;
            
            }

        }
        else if (physicB instanceof RigidBody2D) {
            
            const resolveB = resolve.multiply(-1);

            if (colliderB instanceof BoxCollider2D)
                colliderA instanceof CircularCollider ? physicB.position.subtractInPlace(resolveB) : physicB.position.addInPlace(resolveB);
            
            else if (colliderB instanceof CircularCollider)
                physicB.position.addInPlace(resolveB);

            if (resolveB.y !== 0) {

                physicB.velocity.y = 0;
                physicB.position.y += resolveB.y;

                if (resolveB.y > 0) 
                    physicB.grounded = true;

            }

        }

    }
    
    private notifyCollision(colliderA: Collider, colliderB: Collider, lastFrame: Map<Collider, Collider[]>) {

        const objA = colliderA.reference as GameObject;
        const objB = colliderB.reference as GameObject;

        if (!lastFrame.has(colliderA) || !lastFrame.get(colliderA)!.includes(colliderB)) {
            objA['onCollisionBetween'](objB);
            objB['onCollisionBetween'](objA);
        }

    }
    
    private notifyCollisionExit(lastFrame: Map<Collider, Collider[]>, currentFrame: Map<Collider, Collider[]>) {

        lastFrame.forEach((colliders, mainCollider) => {

            for (const oldCollider of colliders) {
                
                if (!currentFrame.has(mainCollider) || !currentFrame.get(mainCollider)!.includes(oldCollider)) {

                    if (mainCollider.reference instanceof GameObject && oldCollider.reference instanceof GameObject) 
                         (mainCollider.reference as GameObject)['onCollisionExit'](oldCollider.reference as GameObject);
                    
                }

            }

        });

    }

}