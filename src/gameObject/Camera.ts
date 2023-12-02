import GamaSource from "../GamaSource";
import GameObject from "./GameObject";

export default class Camera extends GameObject {

    private target:GameObject | null = null;

    public followObject() {

        if (this.target && this.target.sprite) {

            this.transform.x = GamaSource.window.WIDTH / 2 - this.target.transform.x - this.target.sprite.getSize().width / 2;
            this.transform.y = GamaSource.window.HEIGHT / 2 - this.target.transform.y - this.target.sprite.getSize().height / 2;

            GamaSource.ctx.translate(this.transform.x, this.transform.y);

        }

    }

    public reset() {


    }

    public setTarget(target:GameObject) {

        this.target = target;

    }

}