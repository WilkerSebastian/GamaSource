export default abstract class GameMath {

    public static random(min: number = 0, max: number = 1): number {
        return Math.random() * (max - min) + min;
    }

    public static randomInteger(min: number = 0, max: number = 1): number {
        return this.parseInt(this.random(max - min + 1));
    }

    public static parseInt(x: number): number {
        return Math.floor(x);
    }

    public static root(x: number, exp: number): number {
        return x ** (1 / exp);
    }

    public static degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    public static radiansToDegrees(radians: number): number {
        return radians * 180 / Math.PI;
    }
}
