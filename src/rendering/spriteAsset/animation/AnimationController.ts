import GamaSource, { GameObject, Sprite, Vector2 } from "../../../GamaSource";
import SizeSprite from "../SizeSprite";
import Slice from "../dynamic/Slice";
import SpriteSheet from "../dynamic/SpriteSheet";

export default class AnimationController extends Sprite implements SizeSprite {

    private mapper = new Map<string, SpriteSheet>()
    private currentAnimation:string | null = null
    public scale = new Vector2(1,1)
    public rotation = 0

    constructor(reference?:GameObject | Vector2) {
        super(0, 0, reference)

    }

    public set(anim:string) {

        this.currentAnimation = anim

    };

    public addAnimation(name:string, source:string, pixelRatio: number | {width:number, height:number}, slices:Slice[], staggerFrames?:number) {

        const controller = this.mapper.get(name)

        if (!controller) {
             
            this.mapper.set(name, new SpriteSheet(
                source,
                pixelRatio,
                slices,
                staggerFrames,
                this.reference
            ))
    
            return
            
        }

        console.warn("Animation overwriting is not allowed!");

    }

    private getCurrentAnimation() {

        if (this.currentAnimation) {

            const animation = this.mapper.get(this.currentAnimation)
         
            if (animation) {

                return animation
                
            }

        }

        console.error("Failed to render animation: " + this.currentAnimation)
        GamaSource.falied()

    }

    public render() {

        if(!this.reference)
            this.reference = new Vector2(0,0)

        const animation = this.getCurrentAnimation() as SpriteSheet

        animation.scale = this.scale
        animation.rotation = this.rotation

        animation.render()

    }

    public static load(json:any[], reference:GameObject | Vector2, over?: { pixelRatio?: number, staggerFrames?:number}) {

        const animation = new AnimationController(reference);

        try {

            for (let i = 0; i < json.length; i++) {

                const anim = json[i]

                if (!anim.pixel) {
                    if (over) {

                        if (!over.pixelRatio)
                            throw new Error("over pixel rate not found");
                        else 
                            anim.pixel = over.pixelRatio;

                        if (over.staggerFrames)
                            anim.stagger = over.staggerFrames;

                    } else 
                        throw new Error("over pixel rate not found");
                }
                        
                
                animation.addAnimation(
                    anim.name,
                    anim.source,
                    anim.pixel,
                    anim.slices,
                    anim.stagger
                )
                
            }

            return animation
            
        } catch (error) {
         
            console.error("Failed to load json animtaion, " + error)
            GamaSource.falied()

        } finally {

            animation.set(json[0].name)

            return animation;

        }

    }

    public setWidth(width:number) {
        
        console.warn("AnimationController does not implement setWidth");

    }

    public setHeight(height:number) {
        
        console.warn("AnimationController does not implement setHeight");

    }

    public getSize() {
        
        const animation = this.getCurrentAnimation() as SpriteSheet

        return animation.getSize()

    }

}