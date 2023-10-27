import Vector2 from "../vector/Vector2";

export default class BoxCollider2D {

    public position:Vector2;
    public width:number;
    public height:number;

    constructor(width:number, height:number) {

        this.position = new Vector2(0, 0)
        this.width = width
        this.height = height

    }

    public isCollided(box:BoxCollider2D) {

        return (this.position.x < box.position.x + box.width &&
                this.position.x + this.width > box.position.x &&
                this.position.y < box.position.y + box.height &&
                this.position.y + this.height > box.position.y)

    }

    public resolveCollision(box: BoxCollider2D) {

        const dx = (this.position.x + this.width / 2) - (box.position.x + box.width / 2);
        const dy = (this.position.y + this.height / 2) - (box.position.y + box.height / 2);

        const overlapX = (this.width + box.width) / 2 - Math.abs(dx);
        const overlapY = (this.height + box.height) / 2 - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {

            if (overlapX < overlapY) {
                
                if (dx > 0)
                    return new Vector2(this.position.x + overlapX, this.position.y);

                return new Vector2(this.position.x - overlapX, this.position.y);
            } 

            if (dy > 0) 
                return new Vector2(this.position.x, this.position.y + overlapY);

            return new Vector2(this.position.x, this.position.y - overlapY);
        }

        return this.position

    }

    public update(position:Vector2) {

        this.position = position

    }

}