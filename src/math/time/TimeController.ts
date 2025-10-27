import Time from "../../define/TimeGame"

export default class TimeController {

    public DeltaTime: number;  // Delta time em *SEGUNDOS* (ex: 0.016)
    public FPS: number;
    
    private lastFrameTime: number;
    
    // Para cálculo de FPS
    private frameCount: number;
    private fpsTimer: number;

    constructor(maxFPS: number = 60) { // maxFPS agora é apenas informativo
        this.DeltaTime = 0;
        this.FPS = 0;
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fpsTimer = 0;
    }

    /**
     * Inicia o controlador de tempo.
     * Chamado uma vez em GamaSource.run()
     */
    public initFrame() {
        const now = performance.now();
        this.lastFrameTime = now;
        this.fpsTimer = now;
        this.frameCount = 0;
        this.FPS = 0;
        this.DeltaTime = 0;
    }

    /**
     * Atualiza o deltaTime e o FPS.
     * Chamado uma vez por quadro no GamaSource.loop()
     */
    public update() {
        
        const currentTime = performance.now();

        // --- Cálculo de DeltaTime ---
        
        // 1. Calcula o delta em milissegundos
        let msDelta = currentTime - this.lastFrameTime;

        // 2. Limita o delta máximo (evita a "espiral da morte")
        // Se o utilizador arrastar a janela, o delta pode ser > 1000ms, o que faria
        // a física "teletransportar-se". Limitamos a ~10 FPS.
        if (msDelta > 100) {
            msDelta = 100;
        }

        // 3. Converte para SEGUNDOS e armazena
        this.DeltaTime = msDelta / 1000.0; // ex: 16.66ms / 1000 = 0.01666
        
        // 4. Atualiza o tempo do último quadro
        this.lastFrameTime = currentTime;

        // --- Cálculo de FPS ---
        
        // Conta quadros ao longo de 1 segundo
        this.frameCount++;
        if (currentTime > this.fpsTimer + Time.SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.fpsTimer = currentTime;
        }
    }

    // Não precisamos mais destes métodos:
    // public frameUpdate() { ... }
    // public deltaTimeIsGreaterThenFrameInterval() { ... }
    // public updateDeltaTime() { ... }
    // public setMaxFPS(maxFPS:number) { ... }
    // public getFrameInterval() { ... }

    public getDeltaTime() {
        return this.DeltaTime; // Retorna o delta em segundos
    }
}