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
    isNullVector(): boolean;
}
declare abstract class Component {
}
declare abstract class Collider extends Component {
    position: Vector2;
    constructor(position?: Vector2);
    abstract isCollided(collider: Collider): boolean;
    abstract resolveCollision(collider: Collider): Vector2;
    abstract update(size?: any): void;
}
export class BoxCollider2D extends Collider {
    width: number;
    height: number;
    constructor(width?: number, height?: number);
    isCollided(collider: colliderCollider2D): boolean;
    resolveCollision(collider: colliderCollider2D): Vector2;
    update(size?: {
        width: number;
        height: number;
    }): void;
}
declare abstract class Physic extends Component {
    position: Vector2;
    velocity: Vector2;
    mass: number;
    constructor(mass: number, position?: Vector2);
    abstract applyForce(force: Vector2): void;
    abstract applyFriction(): void;
    abstract update(): void;
}
type ComponentType = "Rendering" | "Physics" | "Collision";
export class GameObject {
    transform: Vector2;
    layer: number;
    tag: string;
    protected visible: boolean;
    static create(obj: typeof GameObject): void;
    destroy(): void;
    getComponent(type: ComponentType): Component;
    setComponent(type: ComponentType, component: Component): void;
    static getElementByTag<T>(tag: string): T | null;
    static getAllElementsByTag<T>(tag: string): T[];
    protected addNode(obj: typeof GameObject, ...args: any[]): void;
    getNode<T>(index: number): T | null;
    getNodeByTag<T>(tag: string): T | null;
    getNodesByTag<T>(tag: string): T[];
    getNodes(): GameObject[];
    protected setRoot(obj: GameObject): void;
    protected getRoot(): GameObject;
    protected getArgument(index: number): any;
    protected getArguments(): any[];
    gameStart(): void;
    start(): void;
    update(): void;
    protected onCollisionBetween(gameObject: GameObject): void;
    protected onCollisionExit(gameObject: GameObject): void;
    protected fixedUpdate(): void;
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
export abstract class Sprite extends Component implements SizeSprite {
    reference?: Vector2 | GameObject;
    width: number;
    height: number;
    constructor(width: number, height: number, reference?: Vector2 | GameObject);
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
    constructor(width: number, height: number, color: string, reference?: Vector2 | GameObject);
}
export class SquareSprite extends ShapeSprite {
    constructor(width: number, height: number, color: string, reference?: Vector2 | GameObject);
    render(): void;
}
declare class GameImage {
    constructor(path: string);
    getSource(): HTMLImageElement;
}
export class StaticSprite extends Sprite implements SizeSprite {
    scale: Vector2;
    rotation: number;
    constructor(source: string, pixelRatio: number | {
        width: number;
        height: number;
    }, reference?: Vector2 | GameObject);
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
    playTo(start: number, end?: number): Promise<void>;
    getDuration(): number;
    setVolume(volume: number): void;
    getVolume(): number;
    setAutoPlay(auto: boolean): void;
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
    getBrightness(): number;
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
interface Slice {
    x: number;
    y: number;
    width: number;
    height: number;
}
export class SpriteSheet extends StaticSprite {
    constructor(source: string, pixelRatio: number | {
        width: number;
        height: number;
    }, slices: Slice[], staggerFrames?: number, reference?: Vector2 | GameObject);
    render(): void;
}
export class AnimationController extends Sprite implements SizeSprite {
    scale: Vector2;
    rotation: number;
    constructor(reference?: GameObject | Vector2);
    set(anim: string): void;
    addAnimation(name: string, source: string, pixelRatio: number | {
        width: number;
        height: number;
    }, slices: Slice[], staggerFrames?: number): void;
    render(): void;
    static load(json: any[], reference: GameObject | Vector2, over?: {
        pixelRatio?: number;
        staggerFrames?: number;
    }): AnimationController;
    setWidth(width: number): void;
    setHeight(height: number): void;
    getSize(): {
        width: number;
        height: number;
    };
}
export class RigidBody2D extends Physic {
    gravity: Vector2;
    frictionCoefficient: number;
    constructor(mass: number | undefined, gravity: number, friction: number, postion?: Vector2);
    applyForce(force: Vector2): void;
    applyFriction(): void;
    update(): void;
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
    source: string;
    volume?: number;
    autoPlay?: boolean;
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
declare class HelperConfig {
    collision?: boolean;
    position?: boolean;
    FPS?: boolean;
    grid?: number;
}
export class Helpers {
    static config: HelperConfig;
    static show(helperConfig: HelperConfig): void;
    static preRender(): void;
    static render(): void;
    static collsion(box: BoxCollider2D, collied?: boolean): void;
    static position(pos: Vector2): void;
    static grid(): void;
}
export class AudioPlayer {
    constructor(source: string, volume?: number, autoPlay?: boolean);
    setEventEnd(event: () => void): void;
    playTo(start: number, end?: number): Promise<void>;
    play(): Promise<void>;
    setAutoPlay(auto: boolean): void;
    pause(): void;
    setVolume(volume: number): void;
    getVolume(): number;
    getDuration(): number;
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
    loader(...assets: string[]): void;
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
