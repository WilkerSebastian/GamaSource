export default abstract class KeyBoard {

    private static events = new Array<(keyboard:KeyboardEvent) => void>
    private static mapper = new Map<string, boolean>()

    public static initialize() {

        document.addEventListener("keydown", (keyboard) => {

            KeyBoard.mapper.set(keyboard.key, true)

            this.events.forEach(e => {

                e(keyboard)

            })

        })
        document.addEventListener("keyup", (e) => KeyBoard.mapper.set(e.key, false))

    }

    public static getKeyDown(key:string) {

        return KeyBoard.mapper.get(key)

    }

}