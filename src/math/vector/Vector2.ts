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

    public division(scaler: number) {
        return this.multiply(1 / scaler);
    }

    public addInPlace(other: Vector2): void {
        this.x += other.x;
        this.y += other.y;
    }

    public subtractInPlace(other: Vector2): void {
        this.x -= other.x;
        this.y -= other.y;
    }

    public multiplyInPlace(scalar: number): void {
        this.x *= scalar;
        this.y *= scalar;
    }

    public dotProduct(other:Vector2) {
        return (this.x * other.x) + (this.y * other.y)
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag === 0) return new Vector2(0, 0);
        return new Vector2(this.x / mag, this.y / mag);
    }

    public vectorToAngle(other:Vector2) {
        return Math.acos(this.dotProduct(other) / (this.magnitude() * other.magnitude()))
    }

    public isNullVector() {
        return this.x == 0 && this.y == 0
    }

    public crossProduct(other:Vector2) {
        return this.x * other.y - this.y * other.x;
    }
    
    public distanceTo(other: Vector2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public interpolate(other: Vector2, t: number): Vector2 {
        const x = this.x + (other.x - this.x) * t;
        const y = this.y + (other.y - this.y) * t;
        return new Vector2(x, y);
    }

    public static zero() {
        return new Vector2(0, 0)
    }

    // Métodos estáticos adicionais
    public static add(vec1: Vector2, vec2: Vector2): Vector2 {
        return vec1.add(vec2);
    }

    public static subtract(vec1: Vector2, vec2: Vector2): Vector2 {
        return vec1.subtract(vec2);
    }

    public static multiply(vec: Vector2, scalar: number): Vector2 {
        return vec.multiply(scalar);
    }

    public static division(vec: Vector2, scalar: number): Vector2 {
        return vec.division(scalar);
    }

    public static dotProduct(vec1: Vector2, vec2: Vector2): number {
        return vec1.dotProduct(vec2);
    }

    public static magnitude(vec: Vector2): number {
        return vec.magnitude();
    }

    public static normalize(vec: Vector2): Vector2 {
        return vec.normalize();
    }

    public static vectorToAngle(vec1: Vector2, vec2: Vector2): number {
        return vec1.vectorToAngle(vec2);
    }

    public static isNullVector(vec: Vector2): boolean {
        return vec.isNullVector();
    }

    public static crossProduct(vec1: Vector2, vec2: Vector2): number {
        return vec1.crossProduct(vec2);
    }

    public static distanceTo(vec1: Vector2, vec2: Vector2): number {
        return vec1.distanceTo(vec2);
    }

    public static interpolate(vec1: Vector2, vec2: Vector2, t: number): Vector2 {
        return vec1.interpolate(vec2, t);
    }
}
