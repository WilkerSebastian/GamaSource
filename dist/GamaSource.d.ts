export default GamaSourceState;
export class GamaSourceConfig {
    maxFPS?: number;
    background?: string;
    imageSmoothingEnabled?: boolean;
    camera?: typeof Camera;
}
/**
 * Represents a 2D vector with x and y components.
 *
 * This class provides methods for performing common operations on 2D vectors, such as addition,
 * subtraction, scalar multiplication, normalization, calculating dot product, magnitude, angle
 * between vectors, and more.
 *
 * It is commonly used in computer graphics, physics simulations, and many other applications.
 *
 * @remarks
 * This class provides methods for performing common operations on 2D vectors, such as addition,
 * subtraction, scalar multiplication, normalization, calculating dot product, magnitude, angle
 * between vectors, and more.
 *
 * @example
 * ```typescript
 * const vec1 = new Vector2(2, 3);
 * const vec2 = new Vector2(-1, 5);
 *
 * const sum = vec1.add(vec2); // Result: Vector2 { x: 1, y: 8 }
 * const difference = vec1.subtract(vec2); // Result: Vector2 { x: 3, y: -2 }
 * const scaled = vec1.multiply(2); // Result: Vector2 { x: 4, y: 6 }
 * const normalized = vec1.normalize(); // Result: Vector2 { x: 0.5547001962252291, y: 0.8320502943378437 }
 * const dotProduct = vec1.dotProduct(vec2); // Result: 13
 * const magnitude = vec1.magnitude(); // Result: 3.605551275463989
 * const angle = vec1.vectorToAngle(vec2); // Result: 0.39479111969976154
 * const isNull = vec1.isNullVector(); // Result: false
 * ```
 */
export class Vector2 {
    /**
     * The x component of the vector.
     */
    x: number;
    /**
     * The y component of the vector.
     */
    y: number;
    /**
    * Creates a new Vector2 instance with the specified x and y components.
    * @param x The x component of the vector.
    * @param y The y component of the vector.
    */
    constructor(x: number, y: number);
    /**
     * Sets the components of the vector to the specified values.
     * @param x The new x component.
     * @param y The new y component.
     */
    set(x: number, y: number): void;
    /**
     * Adds the components of another vector to this vector and returns the result.
     * @param other The vector to add.
     * @returns The resulting vector.
     */
    add(other: Vector2): Vector2;
    /**
     * Subtracts the components of another vector from this vector and returns the result.
     * @param other The vector to subtract.
     * @returns The resulting vector.
     */
    subtract(other: Vector2): Vector2;
    /**
     * Multiplies each component of the vector by a scalar value and returns the result.
     * @param scalar The scalar value to multiply by.
     * @returns The resulting vector.
     */
    multiply(scalar: number): Vector2;
    /**
     * Divides each component of the vector by a scalar value and returns the result.
     * @param scalar The scalar value to divide by.
     * @returns The resulting vector.
     */
    division(scalar: number): Vector2;
    /**
     * Adds the components of another vector to this vector in place.
     * @param other The vector to add.
     */
    addInPlace(other: Vector2): void;
    /**
     * Subtracts the components of another vector from this vector in place.
     * @param other The vector to subtract.
     */
    subtractInPlace(other: Vector2): void;
    /**
     * Multiplies each component of the vector by a scalar value in place.
     * @param scalar The scalar value to multiply by.
     */
    multiplyInPlace(scalar: number): void;
    /**
     * Divides each component of the vector by a scalar value in place.
     * @param scalar The scalar value to divide by.
     */
    divisionInPlace(scalar: number): void;
    /**
     * Calculates the dot product of this vector and another vector.
     * @param other The other vector.
     * @returns The dot product of the two vectors.
     */
    dotProduct(other: Vector2): number;
    /**
     * Calculates the magnitude (length) of the vector.
     * @returns The magnitude of the vector.
     */
    magnitude(): number;
    /**
     * Returns a new vector with the same direction as this vector but with a magnitude of 1 (unit vector).
     * @returns The normalized vector.
     */
    normalize(): Vector2;
    /**
     * Calculates the angle between this vector and another vector.
     * @param other The other vector.
     * @returns The angle between the two vectors in radians.
     */
    vectorToAngle(other: Vector2): number;
    /**
     * Checks if the vector is a null vector (zero vector).
     * @returns True if the vector is a null vector, false otherwise.
     */
    isNullVector(): boolean;
    /**
     * Calculates the cross product of this vector and another vector.
     * @param other The other vector.
     * @returns The cross product of the two vectors.
     */
    crossProduct(other: Vector2): number;
    /**
     * Calculates the Euclidean distance between this vector and another vector.
     * @param other The other vector.
     * @returns The Euclidean distance between the two vectors.
     */
    distanceTo(other: Vector2): number;
    /**
     * Interpolates between this vector and another vector by a specified amount.
     * @param other The other vector.
     * @param t The interpolation amount (between 0 and 1).
     * @returns The interpolated vector.
     */
    interpolate(other: Vector2, t: number): Vector2;
    /**
     * Returns a Vector2 instance with both components set to zero.
     * @returns The zero vector.
     */
    static zero(): Vector2;
    /**
     * Adds two vectors and returns the result.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The sum of the two vectors.
     */
    static add(vec1: Vector2, vec2: Vector2): Vector2;
    /**
     * Subtracts one vector from another and returns the result.
     * @param vec1 The vector to subtract from.
     * @param vec2 The vector to subtract.
     * @returns The result of subtracting the second vector from the first vector.
     */
    static subtract(vec1: Vector2, vec2: Vector2): Vector2;
    /**
     * Multiplies a vector by a scalar value and returns the result.
     * @param vec The vector to multiply.
     * @param scalar The scalar value to multiply by.
     * @returns The result of multiplying the vector by the scalar value.
     */
    static multiply(vec: Vector2, scalar: number): Vector2;
    /**
     * Divides a vector by a scalar value and returns the result.
     * @param vec The vector to divide.
     * @param scalar The scalar value to divide by.
     * @returns The result of dividing the vector by the scalar value.
     */
    static division(vec: Vector2, scalar: number): Vector2;
    /**
     * Calculates the dot product of two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The dot product of the two vectors.
     */
    static dotProduct(vec1: Vector2, vec2: Vector2): number;
    /**
     * Calculates the magnitude of a vector.
     * @param vec The vector.
     * @returns The magnitude of the vector.
     */
    static magnitude(vec: Vector2): number;
    /**
     * Returns a vector with the same direction as the input vector but with a magnitude of 1.
     * @param vec The input vector.
     * @returns The normalized vector.
     */
    static normalize(vec: Vector2): Vector2;
    /**
     * Calculates the angle between two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The angle between the two vectors in radians.
     */
    static vectorToAngle(vec1: Vector2, vec2: Vector2): number;
    /**
     * Checks if a vector is a null vector (zero vector).
     * @param vec The vector to check.
     * @returns True if the vector is a null vector, false otherwise.
     */
    static isNullVector(vec: Vector2): boolean;
    /**
     * Calculates the cross product of two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The cross product of the two vectors.
     */
    static crossProduct(vec1: Vector2, vec2: Vector2): number;
    /**
     * Calculates the Euclidean distance between two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns The Euclidean distance between the two vectors.
     */
    static distanceTo(vec1: Vector2, vec2: Vector2): number;
    /**
     * Interpolates between two vectors by a specified amount.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @param t The interpolation amount (between 0 and 1).
     * @returns The interpolated vector.
     */
    static interpolate(vec1: Vector2, vec2: Vector2, t: number): Vector2;
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
    initFrame(): void;
    frameUpdate(): void;
    deltaTimeIsGreaterThenFrameInterval(): boolean;
    updateDeltaTime(): void;
    setMaxFPS(maxFPS: number): void;
    getDeltaTime(): number;
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
    static angleRelativeToTarget(reference: GameObject, target: Vector2): number;
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
