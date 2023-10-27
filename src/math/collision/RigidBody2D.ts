import { GameObject } from "../../GamaSource";
import Vector2 from "../vector/Vector2";

export default class RigidBody2D {

    public position: Vector2;
    public velocity: Vector2;
    public mass: number;
    public gravity: Vector2;
    public frictionCoefficient:number

    constructor(mass: number = 1, gravity:number, friction:number) {
        this.position = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.mass = mass;
        this.gravity = new Vector2(0, gravity);
        this.frictionCoefficient = friction;
    }

    public applyForce(force: Vector2) {
        const acceleration = force.multiply(1 / this.mass);
        this.velocity = this.velocity.add(acceleration);
    }

    public applyFriction() {

        const friction = this.velocity.multiply(-this.frictionCoefficient);
        this.applyForce(friction);

    }

    public update(obj:GameObject) {
        
        this.applyForce(this.gravity);

        this.position = this.position.add(this.velocity);

        obj.transform.set(this.position.x, this.position.y)

    }
}