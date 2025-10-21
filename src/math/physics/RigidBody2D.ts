import GameObject from "../../gameObject/GameObject";
import Vector2 from "../vector/Vector2";
import Physic from "./Physic";

export default class RigidBody2D extends Physic {

  public gravity: Vector2;
  public friction: number;
  public maxVelocity: number;
  public grounded: boolean; 
  
  constructor(mass: number = 1, gravity: number = 9.8, friction: number = 0.1, maxVelocity: number = 100, position?: Vector2) {
    super(mass, position);
    this.friction = friction;
    this.maxVelocity = maxVelocity;
    this.gravity = new Vector2(0, -gravity);
    this.grounded = false; 
  }

  public update(deltaTime: number): void {

    console.log(this.velocity, this.grounded);
    
    this.applyForce(this.gravity);
    //this.limitVelocity();

    this.position = this.position.add(this.velocity);

    if (this.grounded) 
      this.velocity.x *= (1 - this.friction);

    this.grounded = false
          
  }

  private limitVelocity(): void {

    if (this.velocity.magnitude() > this.maxVelocity)
      this.velocity = this.velocity.normalize().multiply(this.maxVelocity);
    
  }
  
  public applyAcceleration(acceleration: Vector2): void {
    this.velocity = this.velocity.add(acceleration);
  }

  public stop(): void {
    this.velocity.set(0, 0)
  }

}