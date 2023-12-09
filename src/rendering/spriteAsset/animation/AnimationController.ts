import GamaSource, { GameObject, Vector2 } from "../../../GamaSource";
import JsonAnimation from "../../../asset/data/JsonAnimation";
import SizeSprite from "../SizeSprite";
import Slice from "../dynamic/Slice";
import SpriteSheet from "../dynamic/SpriteSheet";

export default class AnimationController implements SizeSprite {

    private mapper = new Map<string, SpriteSheet>()
    private currentAnimation:string | null = null
    private reference?:GameObject | Vector2
    public scale = new Vector2(1,1)
    public rotation = 0

    constructor(reference?:GameObject | Vector2) {

        this.reference = reference

    }

    public set(anim:string) {

        this.currentAnimation = anim

    };

    public addAnimation(name:string, source:string, animation:{pixelRatio: number, slices:Slice[]}, staggerFrames?:number) {

        const controller = this.mapper.get(name)

        if (!controller) {

             
            this.mapper.set(name, new SpriteSheet(
                source,
                animation.pixelRatio,
                animation.slices,
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

    public render(reference?: GameObject | Vector2) {

        if (!this.reference && reference)
            this.reference = reference

        else if(!this.reference)
            this.reference = new Vector2(0,0)

        const animation =  this.getCurrentAnimation() as SpriteSheet

        animation.scale = this.scale
        animation.rotation = this.rotation

        animation.render(this.reference)

    }

    public static load(json:object, anim:{reference:GameObject | Vector2, pixelRatio: number}, staggerFrames?:number) {

        const j = new JsonAnimation(json)

        const animation = new AnimationController(anim.reference);

        if (j.animations) {      
            
            j.animations.forEach(a => {

                animation.addAnimation(a.name, a.source, {

                    pixelRatio: anim.pixelRatio,
                    slices: a.slices

                }, staggerFrames);

            })

            animation.set(j.animations[0].name);

            return animation

        }

        console.error("Failed to load json animtaion")
        GamaSource.falied()

        return animation

    }

    public setWidth(width:number) {
        
        console.warn("AnimationController does not implement setWidth");

    }

    public setHeight(height:number) {
        
        console.warn("AnimationController does not implement setHeight");

    }

    public getSize() {
        
        const animation =  this.getCurrentAnimation() as SpriteSheet

        return animation.getSize()

    }

}