import Vector2 from "../math/vector/Vector2";

export default class GamepadController {

    private gamepadIndex: number;
    private buttonsState: boolean[];
    private axesState: number[];
    private gamepadId: string;
    
    constructor(gamepadIndex: number) {

        this.gamepadIndex = gamepadIndex;
        this.buttonsState = [];
        this.axesState = [];
        this.gamepadId = "NONE"

    }

    public update() {

        const gamepad = navigator.getGamepads()[this.gamepadIndex];

        if (!gamepad) 
            return;

        this.gamepadId = gamepad.id

        this.buttonsState = gamepad.buttons.map(button => button.pressed);

        this.axesState = [...gamepad.axes];

    }

    public getLeftAxis(): Vector2 {

        const vec = Vector2.zero()

        if (!this.isConnected()) 
            return vec
        
        vec.x = this.getAxisValue(0)
        vec.y = this.getAxisValue(1)

        vec.x = Math.abs(vec.x) > 0.5 ? vec.x : 0
        vec.y = Math.abs(vec.y) > 0.5 ? -vec.y : 0

        return vec

    }
    
    public getRightAxis(): Vector2 {

        const vec = Vector2.zero()

        if (!this.isConnected()) 
            return vec
        
        vec.x = this.getAxisValue(2)
        vec.y = this.getAxisValue(3)

        vec.x = Math.abs(vec.x) > 0.5 ? vec.x : 0
        vec.y = Math.abs(vec.y) > 0.5 ? -vec.y : 0

        return vec

    }
    

    public isButtonAPressed(): boolean {
        return this.isButtonPressed(0); 
    }

    public isButtonBPressed(): boolean {
        return this.isButtonPressed(1);  
    }

    public isButtonXPressed(): boolean {
        return this.isButtonPressed(2); 
    }

    public isButtonYPressed(): boolean {
        return this.isButtonPressed(3); 
    }

    public isLeftBumperPressed(): boolean {
        return this.isButtonPressed(4); 
    }

    public isRightBumperPressed(): boolean {
        return this.isButtonPressed(5); 
    }

    public isLeftTriggerPressed(): boolean {
        return this.getAxisValue(2) > 0.5;  
    }

    public isRightTriggerPressed(): boolean {
        return this.getAxisValue(3) > 0.5;  
    }

    public isBackButtonPressed(): boolean {
        return this.isButtonPressed(8);  
    }

    public isStartButtonPressed(): boolean {
        return this.isButtonPressed(9); 
    }

    public isLeftStickPressed(): boolean {
        return this.isButtonPressed(10); 
    }

    public isRightStickPressed(): boolean {
        return this.isButtonPressed(11);  
    }

    public isButtonPressed(buttonIndex: number): boolean {
        return this.buttonsState[buttonIndex] || false;
    }

    public getAxisValue(axisIndex: number): number {
        return this.axesState[axisIndex] || 0;
    }

    public static getConnectedGamepads(): GamepadController[] {

        const gamepads = navigator.getGamepads();
        const connectedGamepads: GamepadController[] = [];

        for (let i = 0; i < gamepads.length; i++) {

            if (gamepads[i]) 
                connectedGamepads.push(new GamepadController(i));
            
        }

        return connectedGamepads;

    }

    public getGamepadType(): string {

        if (this.gamepadId.toLowerCase().includes("xbox"))
            return "Xbox";

        else if (this.gamepadId.toLowerCase().includes("playstation")) 
            return "PlayStation"

        else if (this.gamepadId.toLowerCase().includes("switch")) 
            return "Nintendo Switch";
        
        else 
            return "Other";

    }

    public isConnected(): boolean {
        const gamepads = navigator.getGamepads();
        return gamepads[this.gamepadIndex] !== null;
    }    

}
