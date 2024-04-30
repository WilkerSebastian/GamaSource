export default abstract class GameMath {

    public static standard:Math

    public static random(min?:number, max?:number) {

        min = min ?? 0
        max = max ?? 1

        return (Math.random() + min) * max

    }

    public static randomInteger(min?:number, max?:number) {

        min = min ?? 0
        max = max ?? 1

        return this.parseInt((Math.random() + min) * max)

    }

    public static parseInt(x:number) {

        return parseInt(x.toString())

    }

    public static root(x:number, exp:number) {

        return x ** 1/exp

    }

    public static degressToRadian(degress:number) {

        return degress * Math.PI / 180

    }

    public static radianToDegress(radian:number) {

        return radian * 180 / Math.PI

    }

}