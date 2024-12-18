import Component from "../../gameObject/components/Component";
import Vector2 from "../vector/Vector2";

export default abstract class Physic extends Component {

    public position: Vector2;
    public velocity: Vector2;
    public mass: number;

    constructor(mass:number = 1, position?:Vector2) {
        super()
        this.position = position ?? new Vector2(0, 0)
        this.velocity = new Vector2(0, 0)
        this.mass = mass
    }

    public abstract update(deltaTime:number):void;

    public applyForce(force: Vector2): void {
        const acceleration = force.multiply(1 / this.mass);
        this.velocity = this.velocity.add(acceleration);
    }

}