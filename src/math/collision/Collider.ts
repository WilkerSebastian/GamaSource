import Vector2 from "../vector/Vector2";

export default abstract class Collider {

    public position:Vector2;

    constructor(position?:Vector2) {

        this.position = position ?? new Vector2(0,0)

    }

    public abstract isCollided(collider:Collider):boolean;

    public abstract resolveCollision(collider:Collider):Vector2

    public abstract update(position:Vector2, size?:any):void

}