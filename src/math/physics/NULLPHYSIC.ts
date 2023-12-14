import Vector2 from "../vector/Vector2";
import Physic from "./Physic";

export default class NULLPHYSIC extends Physic {

    constructor(){
        super(0, new Vector2(0,0))
    }

    public applyForce(force: Vector2): void {
        throw new Error("Method not implemented in NULL object.");
    }
    public applyFriction(): void {
        throw new Error("Method not implemented in NULL object.");
    }
    public update(): void {
        throw new Error("Method not implemented in NULL object.");
    }

}