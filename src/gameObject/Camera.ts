import GamaSource, { Sprite, Vector2 } from "../GamaSource";
import GameObject from "./GameObject";

export default class Camera extends GameObject {

    private target:GameObject | null = null;

    public followObject() {

        if (this.target) {

            const sprite = this.getComponent("Rendering") as Sprite

            if (!sprite)
                return

            this.transform.x = GamaSource.window.WIDTH / 2 - this.target.transform.x - sprite.getSize().width / 2;
            this.transform.y = GamaSource.window.HEIGHT / 2 - this.target.transform.y - sprite.getSize().height / 2;

            GamaSource.ctx.translate(this.transform.x, this.transform.y);

        }

    }

    public reset() {

        this.setTarget(null)
        this.transform = new Vector2(0,0)
        GamaSource.ctx.translate(this.transform.x, this.transform.y);

    }

    public setTarget(target:GameObject | null) {

        this.target = target;

    }

}