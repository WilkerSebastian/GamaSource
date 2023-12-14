import Vector2 from "../vector/Vector2";
import Collider from "./Collider";

export default class NULLCOLLISION extends Collider {

    public isCollided(collider: Collider):boolean {
        throw new Error("Method not implemented in NULL Collider.");
    }
    public resolveCollision(collider: Collider):Vector2 {
        throw new Error("Method not implemented in NULL Collider.");
    }
    public update(position: Vector2, size?:any):void {
        throw new Error("Method not implemented in NULL Collider.");
    }

}