import Vector2 from "../vector/Vector2";

export default class BoxCollider2D {

    public position:Vector2;
    public width:number;
    public height:number;

    constructor(position:Vector2, width:number, height:number) {

        this.position = position
        this.width = width
        this.height = height

    }

    public isCollided(box:BoxCollider2D) {

        return (this.position.x < box.position.x + box.width &&
                this.position.x + this.width > box.position.x &&
                this.position.y < box.position.y + box.height &&
                this.position.y + this.height > box.position.y)

    }

    public update(position:Vector2) {

        this.position = position

    }

}