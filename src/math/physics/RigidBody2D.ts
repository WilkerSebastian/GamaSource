import { GameObject } from "../../GamaSource";
import Vector2 from "../vector/Vector2";
import Physic from "./Physic";

export default class RigidBody2D extends Physic {

    public gravity: Vector2;
    public frictionCoefficient:number

    constructor(mass: number = 1, gravity:number, friction:number, postion?:Vector2) {
        super(mass, postion)
        this.gravity = new Vector2(0, gravity);
        this.frictionCoefficient = friction;
    }

    public override applyForce(force: Vector2) {
        const acceleration = force.multiply(1 / this.mass);
        this.velocity = this.velocity.add(acceleration);
    }

    public override applyFriction() {

        const friction = this.velocity.multiply(-this.frictionCoefficient);
        this.applyForce(friction);

    }

    public override update() {
        
        this.applyForce(this.gravity);

        this.position = this.position.add(this.velocity)

    }

}