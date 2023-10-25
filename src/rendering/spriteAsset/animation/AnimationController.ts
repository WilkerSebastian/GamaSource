import GamaSource, { GameObject, Vector2 } from "../../../GamaSource";
import JsonAnimation from "../../../asset/data/JsonAnimation";
import Slice from "../dynamic/Slice";
import SpriteSheet from "../dynamic/SpriteSheet";

export default class AnimationController {

    private mapper = new Map<string, SpriteSheet>()
    private currentAnimation:string | null = null
    private reference:GameObject | Vector2

    constructor(reference:GameObject | Vector2) {

        this.reference = reference

    }

    public set(anim:string) {

        this.currentAnimation = anim

    };

    public addAnimation(name:string, source:string, animation:{ width:number, height:number, slices:Slice[]}) {

        const controller = this.mapper.get(name)

        if (!controller) {

             
            this.mapper.set(name, new SpriteSheet(
                source,
                this.reference,
                animation.width,
                animation.height,
                animation.slices
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

        const animation =  this.getCurrentAnimation() as SpriteSheet

        animation.render()

    }

    public static load(json:object, anim:{reference:GameObject | Vector2, width:number, height:number}) {

        const j = new JsonAnimation(json)

        const animation = new AnimationController(anim.reference);

        if (j.animations) {      
            
            j.animations.forEach(a => {

                animation.addAnimation(a.name, a.source, {

                    width: anim.width,
                    height: anim.height,
                    slices: a.slices

                })

            })

            animation.set(j.animations[0].name);

            return animation

        }

        console.error("Failed to load json animtaion")
        GamaSource.falied()

        return animation

    }

}