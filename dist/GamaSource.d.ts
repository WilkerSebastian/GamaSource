export default GamaSourceState;
export class GamaSourceConfig {
    maxFPS?: number;
}
export class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    set(x: number, y: number): void;
    add(other: Vector2): Vector2;
    subtract(other: Vector2): Vector2;
    multiply(scalar: number): Vector2;
    magnitude(): number;
    normalize(): Vector2;
}
export abstract class Sprite {
    reference: Vector2 | GameObject;
    width: number;
    height: number;
    abstract render(): void;
}
export class GameObject {
    transform: Vector2;
    protected sprite: Sprite | null;
    tag: string;
    static create(obj: typeof GameObject): void;
    start(): void;
    update(): void;
    render(): void;
}
export abstract class KeyBoard {
    static initialize(): void;
    static getKeyDown(key: string): boolean | undefined;
}
export default GamaSourceTime;
export class TimeController {
    DeltaTime: number;
    FPS: number;
    constructor(maxFPS: number);
    updateFrame(currentTime: number): void;
    updateLastFrame(): void;
    setMaxFPS(maxFPS: number): void;
    getDeltaTime(currentTime?: number): number;
    getFrameInterval(): number;
}
export default _default;
export class GameWindow {
    HEIGHT: number;
    WIDTH: number;
    constructor();
    size: {
        getWidth: (percentage: number) => number;
        getHeight: (percentage: number) => number;
    };
    addEvent(ev: () => void): void;
    getScale(): number;
}
export abstract class ShapeSprite extends Sprite {
    color: string;
    constructor(reference: Vector2 | GameObject, width: number, height: number, color: string);
}
export class SquareSprite extends ShapeSprite {
    constructor(reference: Vector2 | GameObject, width: number, height: number, color: string);
    render(): void;
}
export class GamaSource {
    static GameObjects: GameObject[];
    static ctx: CanvasRenderingContext2D;
    static window: GameWindow;
    main: () => void;
    constructor(config?: GamaSourceConfig);
    run(): void;
    static stop(): void;
    static resume(): void;
    static exit(): void;
    static falied(): void;
}
export default GamaSource;

//# sourceMappingURL=GamaSource.d.ts.map
