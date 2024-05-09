import { Vector2 } from "../GamaSource"

export default abstract class KeyBoard {

    private static events = new Array<(keyboard:KeyboardEvent) => void>
    private static mapper = new Map<string, boolean>()
    private static axios = new Array<string>(4)

    public static initialize() {

        this.setAxiosKey({
            up: "w",
            down: "s",
            left: "a",
            right: "d" 
        })

        document.addEventListener("keydown", (keyboard) => {

            KeyBoard.mapper.set(keyboard.key, true)

            this.events.forEach(e => {

                e(keyboard)

            })

        })
        document.addEventListener("keyup", (e) => KeyBoard.mapper.set(e.key, false))

    }

    public static getKeyDown(key:string) {

        return KeyBoard.mapper.get(key.toLowerCase()) || KeyBoard.mapper.get(key.toUpperCase())

    }

    public static getKeyDownExclusive(key:string) {

        return KeyBoard.mapper.get(key)

    }

    public static getAxios(direction: "horizontal" | "vertical" | "transverse") {

        const vec = Vector2.zero()

        if (direction == "vertical" || direction == "transverse") {

            if (this.getKeyDown(this.axios[0]))
                vec.y = 1
    
            if (this.getKeyDown(this.axios[1]))
                vec.y = -1

        }
        
        if (direction == "horizontal" || direction == "transverse") {

            if (this.getKeyDown(this.axios[2]))
                vec.x = -1
    
            if (this.getKeyDown(this.axios[3]))
                vec.x = 1

        }

        return vec        

    }

    public static setAxiosKey(axios: { up?:string, down?:string, left?:string, right?:string}) {

        this.axios[0] = axios.up || this.axios[0]
        this.axios[1] = axios.down || this.axios[1]
        this.axios[2] = axios.left || this.axios[2]
        this.axios[3] = axios.right || this.axios[3]

    }

}