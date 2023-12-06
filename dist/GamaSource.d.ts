export default GamaSourceState;
export class GamaSourceConfig {
    maxFPS?: number;
    background?: string;
    imageSmoothingEnabled?: boolean;
    camera?: typeof Camera;
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
export class BoxCollider2D {
    position: Vector2;
    width: number;
    height: number;
    constructor(width?: number, height?: number);
    isCollided(box: BoxCollider2D): boolean;
    resolveCollision(box: BoxCollider2D): Vector2;
    update(position: Vector2, size?: {
        width: number;
        height: number;
    }): void;
}
export class GameObject {
    transform: Vector2;
    sprite: Sprite | AnimationController | null;
    collider: BoxCollider2D | null;
    physics: RigidBody2D | null;
    protected visible: boolean;
    layer: number;
    tag: string;
    static create(obj: typeof GameObject): void;
    destroy(): void;
    static getElementByTag<T>(tag: string): T;
    static getAllElementsByTag<T>(tag: string): T;
    start(): void;
    update(): void;
    protected onCollisionBetween(gameObject: GameObject): void;
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
interface SizeSprite {
    setWidth(width: number): void;
    setHeight(height: number): void;
    getSize(): {
        width: number;
        height: number;
    };
}
export abstract class Sprite implements SizeSprite {
    reference: Vector2 | GameObject;
    width: number;
    height: number;
    constructor(reference: Vector2 | GameObject, width: number, height: number);
    setWidth(width: number): void;
    setHeight(height: number): void;
    getSize(): {
        width: number;
        height: number;
    };
    abstract render(): void;
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
export class StaticSprite extends Sprite implements SizeSprite {
    scale: Vector2;
    rotation: number;
    constructor(source: string, reference: Vector2 | GameObject, pixelRatio: number | {
        width: number;
        height: number;
    });
    setWidth(width: number): void;
    setHeight(height: number): void;
    getSize(): {
        width: number;
        height: number;
    };
    getImage(): GameImage;
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
    static transform: Vector2;
    static initialize(): void;
    static addEventClick(ev: (mouse: MouseEvent) => void): void;
    static hasPressed(): boolean;
    static getButtonPressed(button: string | number): boolean | undefined;
    static setPointer(pointer: boolean): void;
}
type ratio = number | `${number}%`;
declare class FrameConfig {
    x: ratio;
    y: ratio;
    width: ratio;
    height: ratio;
    visible?: boolean;
    father?: FrameComponent;
}
export class FrameComponent {
    protected childrens: FrameComponent[];
    protected brightness: number;
    protected position: Vector2;
    protected width: number;
    protected height: number;
    protected isHover: boolean;
    protected visible: boolean;
    constructor(frame: FrameConfig);
    setX(x: ratio): void;
    setY(y: ratio): void;
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
    getX(): number;
    getY(): number;
    FrameRender(): void;
    protected onClick(): void;
    protected upClick(): void;
    protected hover(): void;
    protected outHover(): void;
    FrameUpdate(): void;
    FrameStart(): void;
    protected update(): void;
    getChildrens(): FrameComponent[];
    setChildrens(childrens: FrameComponent[]): void;
    protected start(): void;
    protected render(): void;
    setBrightness(brightness: number): void;
    getBrightness(brightness: number): number;
    setScale(scale: Vector2): void;
    setScaleX(x: number): void;
    setScaleY(y: number): void;
    getScale(): Vector2;
    getScaleX(): number;
    getScaleY(): number;
}
declare class FramePanelConfig extends FrameConfig {
    source?: string;
    rounded?: number | DOMPointInit | Iterable<number | DOMPointInit>;
    border?: {
        color?: string;
        size?: number;
    };
}
export class FramePanel extends FrameComponent {
    protected source: string | GameImage;
    protected rounded: number | DOMPointInit | Iterable<number | DOMPointInit> | undefined;
    protected border: {
        color?: string;
        size?: number;
    };
    constructor(frame: FramePanelConfig);
    protected render(): void;
}
declare class FrameTextConfig extends FrameConfig {
    text?: string;
    fontSize?: ratio;
    font?: string;
    color?: string;
}
export class FrameText extends FrameComponent {
    constructor(frame: FrameTextConfig);
    protected render(): void;
    setText(text: string): void;
    getText(): string;
    setFontSize(fontSize: ratio): void;
    getFontSize(): number;
    setFont(font: string): void;
    getFont(): string;
}
export class JsonAnimation {
    animations: [
        {
            name: string;
            slices: [{
                x: number;
                y: number;
                width: number;
                height: number;
            }];
            source: string;
        }
    ];
    constructor(json: any);
}
interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}
export class SpriteSheet extends StaticSprite {
    constructor(source: string, reference: Vector2 | GameObject, pixelRatio: number, slices: Slice[], staggerFrames?: number);
    render(): void;
}
export class AnimationController implements SizeSprite {
    scale: Vector2;
    rotation: number;
    constructor(reference: GameObject | Vector2);
    set(anim: string): void;
    addAnimation(name: string, source: string, animation: {
        pixelRatio: number;
        slices: Slice[];
    }, staggerFrames?: number): void;
    render(): void;
    static load(json: object, anim: {
        reference: GameObject | Vector2;
        pixelRatio: number;
    }, staggerFrames?: number): AnimationController;
    setWidth(width: number): void;
    setHeight(height: number): void;
    getSize(): {
        width: number;
        height: number;
    };
}
export class RigidBody2D {
    position: Vector2;
    velocity: Vector2;
    mass: number;
    gravity: Vector2;
    frictionCoefficient: number;
    constructor(mass: number | undefined, gravity: number, friction: number);
    applyForce(force: Vector2): void;
    applyFriction(): void;
    update(obj: GameObject): void;
}
export class Camera extends GameObject {
    followObject(): void;
    reset(): void;
    setTarget(target: GameObject | null): void;
}
declare class FrameButtonConfig extends FramePanelConfig {
    text?: FrameTextConfig;
}
export class FrameButton extends FramePanel {
    constructor(frame: FrameButtonConfig);
    protected hover(): void;
    protected outHover(): void;
    getText(): FrameText | null;
    setText(frame: FrameTextConfig | FrameText): void;
}
declare class GameVideo {
    constructor(path: string);
    playTo(start: number, end?: number): Promise<void>;
    getDuration(): number;
    setVolume(volume: number): void;
    getVolume(): number;
    setAutoPlay(auto: boolean): void;
    play(): Promise<void>;
    pause(): void;
    getSource(): HTMLVideoElement;
}
declare class VideoPlayerConfig extends FrameConfig {
    path: string;
}
export class VideoPlayer extends FrameComponent {
    source: GameVideo;
    constructor(frame: VideoPlayerConfig);
    setEventEnd(event: () => void): void;
    playTo(start: number, end?: number): Promise<void>;
    play(): Promise<void>;
    setAutoPlay(auto: boolean): void;
    pause(): void;
    setVolume(volume: number): void;
    getVolume(): number;
    getDuration(): number;
    render(): void;
}
export class GamaSource {
    static LOAD: number;
    static ASSETS: Map<string, GameImage | GameAudio | GameVideo>;
    static GameObjects: GameObject[];
    static ctx: CanvasRenderingContext2D;
    static window: GameWindow;
    static UI: FrameComponent;
    static globalEnv: Map<string, any>;
    static ReferenceGame: GamaSource;
    static Camera: Camera;
    static canvas: HTMLCanvasElement;
    constructor(config?: GamaSourceConfig);
    run(): void;
    static stop(): void;
    static resume(): void;
    static exit(): void;
    static falied(): void;
    static loader(...assets: string[]): string[];
    addScene(scene: string, performer: () => void): void;
    changeScene(scene: string): void;
    static addScene(scene: string, performer: () => void): void;
    static changeScene(scene: string): void;
    static getCurrentScene(): any;
    getCurrentScene(): any;
}
export default GamaSource;

//# sourceMappingURL=GamaSource.d.ts.map
