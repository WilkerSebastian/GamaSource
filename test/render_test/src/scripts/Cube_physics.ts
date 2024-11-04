import { BoxCollider2D, GameObject, KeyBoard, RigidBody2D, SquareSprite, Vector2 } from "../../../../dist"

export default class Cube_physics extends GameObject {

    private sprite = new SquareSprite(100, 100, "red")
    private collider = new BoxCollider2D()
    private physics = new RigidBody2D(1, 1, 0.3, 10)


    start() {

        this.transform.set(0, 500)

        this.setComponent("Rendering", this.sprite)
        this.setComponent("Collision", this.collider)
        this.setComponent("Physics", this.physics)

    }

    protected onCollisionBetween(gameObject: GameObject): void {
        
        console.log(this.collider.position.x, this.collider.position.y, this.collider.width, this.collider.height);
        
        const otherCollider = gameObject.getComponent("Collision") as BoxCollider2D
        console.log(otherCollider.position.x, otherCollider.position.y, otherCollider.width, otherCollider.height);

    }

    update() {
        

        if (KeyBoard.getKeyDown("SPACE"))
            this.physics.applyForce(new Vector2(0, 1))

    }

}