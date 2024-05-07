import { Vector2 } from "../../GamaSource";
import GameObject from "../GameObject";

export default abstract class Component {

    public reference: GameObject | Vector2 = Vector2.zero()

}