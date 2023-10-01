import GameOject from "../gameObject/GameObject";
import Vector2 from "../math/vector/Vector2";

export default abstract class Sprite {

    public reference: Vector2 | GameOject
    public width = 0;
    public height = 0;

    public abstract render():void

}