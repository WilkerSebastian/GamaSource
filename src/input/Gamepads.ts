import GamepadController from "./GamepadController";

export default abstract class Gamepads {

    private static gamepads:GamepadController[] = [];
    public static first:GamepadController 
    public static second:GamepadController 
    public static third:GamepadController 
    public static fourth:GamepadController

    private static setGamepads() {

        if (this.gamepads[0])
            this.first = this.gamepads[0]

        if (this.gamepads[1])
            this.second = this.gamepads[1]

        if (this.gamepads[2])
            this.third = this.gamepads[2]

        if (this.gamepads[3])
            this.fourth = this.gamepads[3]

    }

    public static initialize() {

        this.gamepads = [];

        window.addEventListener("gamepadconnected", (event: GamepadEvent) => {

            console.log(`Gamepad connected: ${event.gamepad.id}`);
            
            this.gamepads = GamepadController.getConnectedGamepads()
            this.setGamepads()
        
        })

        window.addEventListener("gamepaddisconnected", (event: GamepadEvent) => {

            console.log(`Gamepad disconnected: ${event.gamepad.id}`);
            
            this.gamepads = GamepadController.getConnectedGamepads()
            this.setGamepads()
        
        })

    }

    public static update() {

        for (let index = 0; index < this.gamepads.length; index++)
            this.gamepads[index].update();

    }

}