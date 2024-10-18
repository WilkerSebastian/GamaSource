import { BoxCollider2D, GameObject, RigidBody2D, SquareSprite } from "../../../../dist"

export default class Cube_physics extends GameObject {

    private sprite = new SquareSprite(100, 100, "red")
    private collider = new BoxCollider2D()
    private physics = new RigidBody2D(1, 0.3, 2)


    start() {

        this.transform.set(0, 500)

        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)
        this.setComponent("Physics", this.physics)

    }

    update() {

    }

}