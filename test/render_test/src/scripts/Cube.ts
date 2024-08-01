import { DataSave, GameObject, KeyBoard, SquareSprite } from "gamasource"

export default class Cube extends GameObject {

    private sprite = new SquareSprite(100, 100, "red")
    private saveManeger = new DataSave<Cube>("Cubes")

    start() {

        this.tag = "Cube"

        const save = this.saveManeger.getById(this.tag)

        if (save) 
            this.transform.copy(save.transform)
    
        else 
            this.transform.set(350, 350)

        this.setComponent("Rendering", this.sprite)

        setInterval(() => {

            if (save)
                this.saveManeger.update(this)

            else
                this.saveManeger.save(this)

        }, 500)

    }

    update() {
 
        const axios = KeyBoard.getAxios("transverse")

        this.transform.addInPlace(axios.multiply(3))

    }

}