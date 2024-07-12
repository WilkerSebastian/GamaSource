import { GamaSource, GameObject, KeyBoard, StaticSprite, Vector2 } from "gamasource";
import DataSaver from "./DataSaver";

export default class Player extends GameObject {

    private speed = 5;
    private lastPosition:Vector2|null = null;
    private sprite = new StaticSprite("atomic.png", 38)

    start() {
            if (DataSaver.getItem("position")==null){            
                this.transform.set(350, 350)
                this.lastPosition = new  Vector2(this.transform.x, this.transform.y)
            }
            else{
                this.lastPosition=DataSaver.getItem("position") as Vector2
                this.transform = new Vector2(this.lastPosition.x, this.lastPosition.y)
            }
        
        this.setComponent("Rendering", this.sprite)
        
    }

    update() {

        if(this.lastPosition!=null){
            if (this.lastPosition.x != this.transform.x){
                DataSaver.setItem("position", this.transform.x)
            }
            if (this.lastPosition.y != this.transform.y){
                DataSaver.setItem("position", this.transform.y)
            }
        }

        if (KeyBoard.getKeyDown("w")) {
            
            this.transform.y -= this.speed

        }
        if (KeyBoard.getKeyDown("a")) {

            this.transform.x -= this.speed
            
        }
        if (KeyBoard.getKeyDown("d")) {

            this.transform.x += this.speed
            
        }
        if (KeyBoard.getKeyDown("s")) {

            this.transform.y += this.speed
            
        }

        if (KeyBoard.getKeyDown("k")) {

            GamaSource.changeScene("porra")
            
        }

        if(this.lastPosition!=null){
            this.lastPosition.x=this.transform.x
        }
        if(this.lastPosition!=null){
            this.lastPosition.y=this.transform.y
        }
    }

}