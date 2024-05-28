import Component from "../../gameObject/components/Component";
import Vector2 from "../vector/Vector2";

export default abstract class Collider extends Component {

    public position:Vector2;
    public scale = new Vector2(1,1)

    constructor(position?:Vector2) {
        super()
        this.position = position || Vector2.zero()
    }

    public abstract isCollided(collider:Collider):boolean;

    public abstract resolveCollision(collider:Collider):Vector2

    public abstract update():void

}