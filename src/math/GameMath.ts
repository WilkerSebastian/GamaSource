/**
 * Utility class for common mathematical operations used in game development.
 */
export default abstract class GameMath {

    /**
     * Generates a random floating-point number between the specified minimum and maximum values.
     * 
     * @param min The minimum value (inclusive). Default is 0.
     * @param max The maximum value (exclusive). Default is 1.
     * @returns A random number between min (inclusive) and max (exclusive).
     */
    public static random(min: number = 0, max: number = 1): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * Generates a random integer between the specified minimum and maximum values.
     * 
     * @param min The minimum value (inclusive). Default is 0.
     * @param max The maximum value (exclusive). Default is 1.
     * @returns A random integer between min (inclusive) and max (exclusive).
     */
    public static randomInteger(min: number = 0, max: number = 1): number {
        return this.parseInt(this.random(max - min + 1));
    }

    /**
     * Parses a number to an integer.
     * 
     * @param x The number to parse.
     * @returns The parsed integer value.
     */
    public static parseInt(x: number): number {
        return Math.floor(x);
    }

    /**
     * Calculates the nth root of a number.
     * 
     * @param x The number.
     * @param exp The exponent (n).
     * @returns The nth root of the number.
     */
    public static root(x: number, exp: number): number {
        return x ** (1 / exp);
    }

    /**
     * Converts degrees to radians.
     * 
     * @param degrees The angle in degrees.
     * @returns The equivalent angle in radians.
     */
    public static degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    /**
     * Converts radians to degrees.
     * 
     * @param radians The angle in radians.
     * @returns The equivalent angle in degrees.
     */
    public static radiansToDegrees(radians: number): number {
        return radians * 180 / Math.PI;
    }
}
