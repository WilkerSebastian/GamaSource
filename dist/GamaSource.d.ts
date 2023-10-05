export default GamaSourceState;
export class GamaSourceConfig {
    maxFPS?: number;
    background?: string;
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
    constructor(reference: Vector2 | GameObject, width: number, height: number);
    abstract render(): void;
}
export class GameObject {
    transform: Vector2;
    protected sprite: Sprite | null;
    protected visible: boolean;
    tag: string;
    static create(obj: typeof GameObject): void;
    destroy(): void;
    static getElementByTag<T>(tag: string): T;
    static getAllElementsByTag<T>(tag: string): T;
    start(): void;
    protected update(): void;
    gameUpdate(): void;
    render(): void;
}
export abstract class KeyBoard {
    static initialize(): void;
    static getKeyDown(key: string): boolean | undefined;
}
export default GameTime;
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
declare class GameImage {
    constructor(path: string);
    getSource(): HTMLImageElement;
}
export class StaticSprite extends Sprite {
    constructor(source: string, reference: Vector2 | GameObject, width: number, height: number);
    render(): void;
}
export abstract class GameMath {
    static standard: Math;
    static random(min?: number, max?: number): number;
    static randomInteger(min?: number, max?: number): number;
    static parseInt(x: number): number;
    static root(x: number, exp: number): number;
    static distance(v1: Vector2, v2: Vector2): number;
    static degressToRadian(degress: number): number;
    static radianToDegress(radian: number): number;
}
declare class GameAudio {
    constructor(path: string);
    pause(): void;
    setLoop(loop: boolean): void;
    setVolume(volume: number): void;
    getVolume(): number;
    play(): Promise<void>;
    getSource(): HTMLAudioElement;
}
export abstract class Mouse {
    static initialize(): void;
    static addEventClick(ev: (mouse: MouseEvent) => void): void;
    static hasPressed(): boolean;
    static getButtonPressed(button: string | number): boolean | undefined;
}
type ratio = number | `${number}%`;
export class FrameComponent {
    protected position: Vector2;
    protected width: number;
    protected height: number;
    protected visible: boolean;
    constructor(frame: {
        x: ratio;
        y: ratio;
        width: ratio;
        height: ratio;
        visible?: boolean;
        father?: FrameComponent;
    });
    setX(x: ratio): void;
    sety(y: ratio): void;
    setWidth(width: ratio): void;
    setHeight(height: ratio): void;
    setPosition(x: ratio, y: ratio): void;
    setSize(width: ratio, height: ratio): void;
    setBounds(x: ratio, y: ratio, width: ratio, height: ratio): void;
    add(frame: FrameComponent): void;
    setFather(frame: FrameComponent): void;
    getFather(): FrameComponent | null;
    getPosition(): Vector2;
    getWidth(): number;
    getHeight(): number;
    FrameRender(): void;
    getChildrens(): FrameComponent[];
    setChildrens(childrens: FrameComponent[]): void;
    protected render(): void;
}
export class FramePanel extends FrameComponent {
    protected source: string;
    protected rounded: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined;
    protected border: {
        color?: string;
        size?: number;
    };
    constructor(frame: {
        x: ratio;
        y: ratio;
        width: ratio;
        height: ratio;
        visible?: boolean;
        father?: FrameComponent;
        source?: string;
        rounded?: number | DOMPointInit | Iterable<number | DOMPointInit>;
        border?: {
            color?: string;
            size?: number;
        };
    });
    protected render(): void;
}
export class FrameText extends FrameComponent {
    constructor(frame: {
        x: ratio;
        y: ratio;
        width: ratio;
        text?: string;
        visible?: boolean;
        father?: FrameComponent;
        fontSize?: ratio;
        font?: string;
        color?: string;
    });
    protected render(): void;
    setText(text: string): void;
    getText(): string;
    setFontSize(fontSize: ratio): void;
    getFontSize(): number;
    setFont(font: string): void;
    getFont(): string;
}
export class GamaSource {
    static LOAD: number;
    static ASSETS: Map<string, GameImage | GameAudio>;
    static GameObjects: GameObject[];
    static ctx: CanvasRenderingContext2D;
    static window: GameWindow;
    static UI: FrameComponent;
    main: () => void;
    constructor(config?: GamaSourceConfig);
    run(): void;
    static stop(): void;
    static resume(): void;
    static exit(): void;
    static falied(): void;
    static loader(...assets: string[]): string[];
}
export default GamaSource;

//# sourceMappingURL=GamaSource.d.ts.map
