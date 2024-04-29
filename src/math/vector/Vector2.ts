/**
 * Represents a 2D vector with x and y components.
 * 
 * This class provides methods for performing common operations on 2D vectors, such as addition,
 * subtraction, scalar multiplication, normalization, calculating dot product, magnitude, angle
 * between vectors, and more.
 * 
 * It is commonly used in computer graphics, physics simulations, and many other applications.
 * 
 * @remarks
 * This class provides methods for performing common operations on 2D vectors, such as addition,
 * subtraction, scalar multiplication, normalization, calculating dot product, magnitude, angle
 * between vectors, and more.
 * 
 * @example
 * ```typescript
 * const vec1 = new Vector2(2, 3);
 * const vec2 = new Vector2(-1, 5);
 * 
 * const sum = vec1.add(vec2); // Result: Vector2 { x: 1, y: 8 }
 * const difference = vec1.subtract(vec2); // Result: Vector2 { x: 3, y: -2 }
 * const scaled = vec1.multiply(2); // Result: Vector2 { x: 4, y: 6 }
 * const normalized = vec1.normalize(); // Result: Vector2 { x: 0.5547001962252291, y: 0.8320502943378437 }
 * const dotProduct = vec1.dotProduct(vec2); // Result: 13
 * const magnitude = vec1.magnitude(); // Result: 3.605551275463989
 * const angle = vec1.vectorToAngle(vec2); // Result: 0.39479111969976154
 * const isNull = vec1.isNullVector(); // Result: false
 * ```
 */
export default class Vector2 {

    /**
     * The x component of the vector.
     */
    public x: number;

    /**
     * The y component of the vector.
     */
    public y: number;

     /**
     * Creates a new Vector2 instance with the specified x and y components.
     * @param x The x component of the vector.
     * @param y The y component of the vector.
     */
    constructor(x:number, y:number) {
        this.x = x
        this.y = y
    }

    /**
     * Sets the components of the vector to the specified values.
     * @param x The new x component.
     * @param y The new y component.
     */
    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds the components of another vector to this vector and returns the result.
     * @param other The vector to add.
     * @returns The resulting vector.
     */
    public add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    
    /**
     * Subtracts the components of another vector from this vector and returns the result.
     * @param other The vector to subtract.
     * @returns The resulting vector.
     */
    public subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    /**
     * Multiplies each component of the vector by a scalar value and returns the result.
     * @param scalar The scalar value to multiply by.
     * @returns The resulting vector.
     */
    public multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    /**
     * Divides each component of the vector by a scalar value and returns the result.
     * @param scalar The scalar value to divide by.
     * @returns The resulting vector.
     */
    public division(scalar: number): Vector2 {
        return this.multiply(1 / scalar);
    }

    /**
     * Adds the components of another vector to this vector in place.
     * @param other The vector to add.
     */
    public addInPlace(other: Vector2): void {
        this.x += other.x;
        this.y += other.y;
    }

    /**
     * Subtracts the components of another vector from this vector in place.
     * @param other The vector to subtract.
     */
    public subtractInPlace(other: Vector2): void {
        this.x -= other.x;
        this.y -= other.y;
    }

    /**
     * Multiplies each component of the vector by a scalar value in place.
     * @param scalar The scalar value to multiply by.
     */
    public multiplyInPlace(scalar: number): void {
        this.x *= scalar;
        this.y *= scalar;
    }

    /**
     * Divides each component of the vector by a scalar value in place.
     * @param scalar The scalar value to divide by.
     */
    public divisionInPlace(scalar: number): void {
        this.multiplyInPlace(1 / scalar);
    }

    /**
     * Calculates the dot product of this vector and another vector.
     * @param other The other vector.
     * @returns The dot product of the two vectors.
     */
    public dotProduct(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Calculates the magnitude (length) of the vector.
     * @returns The magnitude of the vector.
     */
    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns a new vector with the same direction as this vector but with a magnitude of 1 (unit vector).
     * @returns The normalized vector.
     */
    public normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag === 0) return new Vector2(0, 0);
        return new Vector2(this.x / mag, this.y / mag);
    }

    /**
     * Calculates the angle between this vector and another vector.
     * @param other The other vector.
     * @returns The angle between the two vectors in radians.
     */
    public vectorToAngle(other: Vector2): number {
        return Math.acos(this.dotProduct(other) / (this.magnitude() * other.magnitude()));
    }

    /**
     * Checks if the vector is a null vector (zero vector).
     * @returns True if the vector is a null vector, false otherwise.
     */
    public isNullVector(): boolean {
        return this.x === 0 && this.y === 0;
    }

    /**
     * Calculates the cross product of this vector and another vector.
     * @param other The other vector.
     * @returns The cross product of the two vectors.
     */
    public crossProduct(other: Vector2): number {
        return this.x * other.y - this.y * other.x;
    }
    
    /**
     * Calculates the Euclidean distance between this vector and another vector.
     * @param other The other vector.
     * @returns The Euclidean distance between the two vectors.
     */
    public distanceTo(other: Vector2): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Interpolates between this vector and another vector by a specified amount.
     * @param other The other vector.
     * @param t The interpolation amount (between 0 and 1).
     * @returns The interpolated vector.
     */
    public interpolate(other: Vector2, t: number): Vector2 {
        const x = this.x + (other.x - this.x) * t;
        const y = this.y + (other.y - this.y) * t;
        return new Vector2(x, y);
    }

    /**
     * Returns a Vector2 instance with both components set to zero.
     * @returns The zero vector.
     */
    public static zero(): Vector2 {
        return new Vector2(0, 0);
    }

    /**
     * Adds two vectors and returns the result.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The sum of the two vectors.
     */
    public static add(vec1: Vector2, vec2: Vector2): Vector2 {
        return vec1.add(vec2);
    }

    /**
     * Subtracts one vector from another and returns the result.
     * @param vec1 The vector to subtract from.
     * @param vec2 The vector to subtract.
     * @returns The result of subtracting the second vector from the first vector.
     */
    public static subtract(vec1: Vector2, vec2: Vector2): Vector2 {
        return vec1.subtract(vec2);
    }

    /**
     * Multiplies a vector by a scalar value and returns the result.
     * @param vec The vector to multiply.
     * @param scalar The scalar value to multiply by.
     * @returns The result of multiplying the vector by the scalar value.
     */
    public static multiply(vec: Vector2, scalar: number): Vector2 {
        return vec.multiply(scalar);
    }

    /**
     * Divides a vector by a scalar value and returns the result.
     * @param vec The vector to divide.
     * @param scalar The scalar value to divide by.
     * @returns The result of dividing the vector by the scalar value.
     */
    public static division(vec: Vector2, scalar: number): Vector2 {
        return vec.division(scalar);
    }

    /**
     * Calculates the dot product of two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The dot product of the two vectors.
     */
    public static dotProduct(vec1: Vector2, vec2: Vector2): number {
        return vec1.dotProduct(vec2);
    }

    /**
     * Calculates the magnitude of a vector.
     * @param vec The vector.
     * @returns The magnitude of the vector.
     */
    public static magnitude(vec: Vector2): number {
        return vec.magnitude();
    }

    /**
     * Returns a vector with the same direction as the input vector but with a magnitude of 1.
     * @param vec The input vector.
     * @returns The normalized vector.
     */
    public static normalize(vec: Vector2): Vector2 {
        return vec.normalize();
    }

    /**
     * Calculates the angle between two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The angle between the two vectors in radians.
     */
    public static vectorToAngle(vec1: Vector2, vec2: Vector2): number {
        return vec1.vectorToAngle(vec2);
    }

    /**
     * Checks if a vector is a null vector (zero vector).
     * @param vec The vector to check.
     * @returns True if the vector is a null vector, false otherwise.
     */
    public static isNullVector(vec: Vector2): boolean {
        return vec.isNullVector();
    }

    /**
     * Calculates the cross product of two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The cross product of the two vectors.
     */
    public static crossProduct(vec1: Vector2, vec2: Vector2): number {
        return vec1.crossProduct(vec2);
    }

    /**
     * Calculates the Euclidean distance between two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The Euclidean distance between the two vectors.
     */
    public static distanceTo(vec1: Vector2, vec2: Vector2): number {
        return vec1.distanceTo(vec2);
    }

    /**
     * Interpolates between two vectors by a specified amount.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @param t The interpolation amount (between 0 and 1).
     * @returns The interpolated vector.
     */
    public static interpolate(vec1: Vector2, vec2: Vector2, t: number): Vector2 {
        return vec1.interpolate(vec2, t);
    }

}
