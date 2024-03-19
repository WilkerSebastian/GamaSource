export default class Vector2 {

    public x:number
    public y:number

    constructor(x:number, y:number) {

        this.x = x
        this.y = y

    }

    public set(x:number, y:number) {

        this.x = x
        this.y = y

    }

    public add(other: Vector2): Vector2 {

        return new Vector2(this.x + other.x, this.y + other.y);

    }
    
    public subtract(other: Vector2): Vector2 {

        return new Vector2(this.x - other.x, this.y - other.y);

    }

    public multiply(scalar: number): Vector2 {

        return new Vector2(this.x * scalar, this.y * scalar);

    }

    public magnitude(): number {

        return Math.sqrt(this.x * this.x + this.y * this.y);

    }

    public normalize(): Vector2 {

        const mag = this.magnitude();

        if (mag === 0) return new Vector2(0, 0);

        return new Vector2(this.x / mag, this.y / mag);

    }

    public isNullVector() {

        return this.x == 0 && this.y == 0

    }

}