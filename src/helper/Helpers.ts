import GamaSource from "../core/GamaSource";
import HelperConfig from "../define/HelperConfig";
import GameObject from "../gameObject/GameObject";
import BoxCollider2D from "../math/collision/BoxCollider2D";
import Collider from "../math/collision/Collider";
import GameMath from "../math/GameMath";
import Vector2 from "../math/vector/Vector2";
import Sprite from "../rendering/Sprite";

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

    public static collsion(collider:Collider, collied?:boolean) {

        if (collider instanceof BoxCollider2D) {

            GamaSource.ctx.save()
            GamaSource.ctx.fillStyle = collied ? "#ec59b5" : "#CCCCCC"

            const x = GamaSource.window.getScalableMeasure(collider.position.x)
            const y = -GamaSource.window.getScalableMeasure(collider.position.y)

            GamaSource.ctx.translate(x, y)

            GamaSource.ctx.fillRect(
                -collider.width / 2, 
                -collider.height / 2, 
                collider.width, 
                collider.height
            )
            GamaSource.ctx.restore()

        }

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

    public static position(obj:GameObject) {

        const { x, y, width, height } = (obj.getComponent("Rendering") as Sprite).getRenderObject()

        GamaSource.ctx.save()
        GamaSource.ctx.fillStyle = "#000"
        GamaSource.ctx.font = "18px ARIAL"
        GamaSource.ctx.fillText(`x: ${obj.transform.x.toPrecision(3)}`,x + width / 2, (y - height / 2) - 36)
        GamaSource.ctx.fillText(`y: ${obj.transform.y.toPrecision(3)}`, x + width / 2, (y - height / 2) - 18)
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

    /**
     * Calculates the angle between the reference object and the target position.
     * 
     * @param reference The reference GameObject object.
     * @param target The target position (Vector2).
     * @returns The angle (in degrees) between the reference object and the target position.
     *          Returns 0 if the reference object doesn't have a "Rendering" component.
     */
    public static angleRelativeToTarget(reference: GameObject, target: Vector2): number {
        
        const sprite = reference.getComponent("Rendering") as Sprite

        if (!sprite) {
            console.warn("reference needs Rendering Component!");
            return 0;
        }

        let { x, y, width, height } = sprite.getRenderObject()

        const midVector = new Vector2(x - (width / 2), y - (height / 2))

        const vectorA = new Vector2((GamaSource.window.WIDTH / 2) + target.x, 0);

        const vectorB = target.subtract(midVector);

        return GameMath.radiansToDegrees(vectorA.vectorToAngle(vectorB)) * (target.y > vectorA.y ? 1 : -1);

    }

}