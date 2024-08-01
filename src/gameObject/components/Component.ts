import Vector2 from "../../math/vector/Vector2";
import GameObject from "../GameObject";

export default abstract class Component {

    public reference: GameObject | Vector2 = Vector2.zero()

}