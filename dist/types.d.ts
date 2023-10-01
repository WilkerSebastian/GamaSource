interface GamaSourceConfig {
    maxFPS?: number;
}
declare class Vector2 {
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
declare abstract class Sprite {
    reference: Vector2 | GameOject;
    width: number;
    height: number;
    abstract render(): void;
}
declare class GameOject {
    transform: Vector2;
    protected sprite: Sprite | null;
    tag: string;
    static create(obj: typeof GameOject): void;
    start(): void;
    update(): void;
    render(): void;
}
declare class GameWindow {
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
export default class GamaSource {
    static GameObjects: GameOject[];
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

//# sourceMappingURL=types.d.ts.map
