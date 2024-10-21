import GameObject from "../../gameObject/GameObject"
import Vector2 from "../vector/Vector2"
import Physic from "./Physic"

export default class StaticBody2D extends Physic {

    constructor(position?:Vector2) {
        super(0, position)
    }

    public override update() {

        if (this.reference instanceof GameObject)
            this.reference.transform.copy(this.position)

        else
            this.reference.copy(this.position)

    }

}