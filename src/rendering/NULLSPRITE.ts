import { GameObject, Vector2 } from "../GamaSource";
import Sprite from "./Sprite";

export default class NULLSPRITE extends Sprite {

    constructor() {
        super(0,0, new Vector2(0, 0))
    }

    public render(): void {
        throw new Error("Method not implemented in NULL sprite.");
    }

}