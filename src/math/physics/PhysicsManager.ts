import GameObject from "../../gameObject/GameObject";
import Physic from "./Physic";

export default class PhysicsManager {

    private components: Physic[] = [];

    public add(component: Physic): void {
        this.components.push(component);
    }

    public remove(component: Physic): void {
        this.components = this.components.filter(c => c !== component);
    }

    public update(deltaTime: number): void {
    
        for (const component of this.components) 
            component.update(deltaTime);
        
    }

    public sync() {

        for (const component of this.components) 
            if (component.reference instanceof GameObject)
                component.reference.transform.copy(component.position)

    }

}