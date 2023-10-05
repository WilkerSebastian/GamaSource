import GamaSource, { GameObject, Vector2 } from "../../../GamaSource";
import Slice from "../dynamic/Slice";
import SpriteSheet from "../dynamic/SpriteSheet";

export default abstract class AnimationController {

    private mapper = new Map<string, SpriteSheet>()
    private currentAnimation:string | null = null
    private reference:GameObject | Vector2
    private source?:string

    constructor(reference:GameObject | Vector2) {

        this.reference = reference

    }

    public abstract create(): void

    public setSource(source:string) {

        this.source = source

    }

    public addAnimation(name:string, animation:{width:number, height:number, slices:Slice[]}) {

        const controller = this.mapper.get(name)

        if (!controller) {

            if (this.source) {
             
                this.mapper.set(name, new SpriteSheet(
                    this.source,
                    this.reference,
                    animation.width,
                    animation.height,
                    animation.slices
                ))
    
                return

            }

            console.error("The source of animation not found!")
            GamaSource.falied()

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

}