import GamaSource, { BoxCollider2D, Vector2 } from "../GamaSource";
import HelperConfig from "../define/HelperConfig";

export default class Helpers {

    public static config:HelperConfig = {

        collision:false,
        FPS:false,
        grid: undefined,
        position: false

    }

    public static show(helperConfig:HelperConfig) {

        Helpers.config = helperConfig

    }

    public static preRender() {

        if (this.config.grid)
            if (this.config.grid > 0)
                this.grid()
    }

    public static render() {

        if (this.config.FPS)
            this.FPS()

    }

    public static collsion(box:BoxCollider2D, collied?:boolean) {

        GamaSource.ctx.save()
        GamaSource.ctx.fillStyle = collied ? "#ec59b5" : "#CCCCCC"
        GamaSource.ctx.fillRect(box.position.x, box.position.y, box.width, box.height)
        GamaSource.ctx.restore()

    }

    private static FPS() {

        GamaSource.ctx.save()
        GamaSource.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        GamaSource.ctx.fillRect(GamaSource.window.WIDTH - 250, 0, 250, 75)
        GamaSource.ctx.fillStyle = "#fff"
        GamaSource.ctx.font = "25px ARIAL"
        GamaSource.ctx.fillText(`FPS: ${GamaSource.globalEnv.get("FPS")}`, GamaSource.window.WIDTH - 180 , 35)
        GamaSource.ctx.restore()

    }

    public static position(pos:Vector2) {

        GamaSource.ctx.save()
        GamaSource.ctx.fillStyle = "#000"
        GamaSource.ctx.font = "18px ARIAL"
        GamaSource.ctx.fillText(`x: ${pos.x}`,pos.x + 18, pos.y - 36)
        GamaSource.ctx.fillText(`y: ${pos.y}`, pos.x + 18, pos.y - 18)
        GamaSource.ctx.restore()

    }

    public static grid() {

        const gridSize = this.config.grid as number

        GamaSource.ctx.strokeStyle = "rgba(0,0,0, 0.1)";
        GamaSource.ctx.lineWidth = 1;

        for (let x = GamaSource.window.WIDTH * -10; x <= GamaSource.window.WIDTH * 10; x += gridSize) {
            GamaSource.ctx.beginPath();
            GamaSource.ctx.moveTo(x, GamaSource.window.WIDTH * -10);
            GamaSource.ctx.lineTo(x, GamaSource.window.HEIGHT * 10);
            GamaSource.ctx.stroke();
        }

        for (let y = GamaSource.window.HEIGHT * -10; y <= GamaSource.window.HEIGHT * 10; y += gridSize) {
            GamaSource.ctx.beginPath();
            GamaSource.ctx.moveTo(GamaSource.window.WIDTH * -10, y);
            GamaSource.ctx.lineTo(GamaSource.window.WIDTH * 10, y);
            GamaSource.ctx.stroke();
        }

    }

}