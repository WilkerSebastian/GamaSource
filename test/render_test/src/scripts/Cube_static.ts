import { GameObject, StaticBody2D, SquareSprite, BoxCollider2D } from "../../../../dist"

export default class Cube_static extends GameObject {

    private sprite = new SquareSprite(250, 100, "blue")
    private collider = new BoxCollider2D()
    private physics = new StaticBody2D()


    start() {

        this.transform.set(-200, -300)

        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)
        this.setComponent("Physics", this.physics)

    }

    update() {

    }

}