import Vector2 from "../vector/Vector2";

export default abstract class Physic {

    public position: Vector2;
    public velocity: Vector2;
    public mass: number;

    constructor(mass:number, position?:Vector2) {

        this.position = position ?? new Vector2(0, 0)
        this.velocity = new Vector2(0, 0)
        this.mass = mass

    }

    public abstract applyForce(force: Vector2):void;

    public abstract applyFriction():void;

    public abstract update():void;

}