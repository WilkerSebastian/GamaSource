var $d138717687ddda30$var$GamaSourceState;
(function(GamaSourceState) {
    GamaSourceState[GamaSourceState["CLOSED"] = 0] = "CLOSED";
    GamaSourceState[GamaSourceState["LOADING"] = 1] = "LOADING";
    GamaSourceState[GamaSourceState["RUNNING"] = 2] = "RUNNING";
    GamaSourceState[GamaSourceState["STOPPED"] = 3] = "STOPPED";
    GamaSourceState[GamaSourceState["CRASHED"] = 4] = "CRASHED";
})($d138717687ddda30$var$GamaSourceState || ($d138717687ddda30$var$GamaSourceState = {}));
var $d138717687ddda30$export$2e2bcd8739ae039 = $d138717687ddda30$var$GamaSourceState;


class $8ada8c2f2e8cd214$export$2e2bcd8739ae039 {
}



class $08115c74b7a4e0bd$export$2e2bcd8739ae039 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new $08115c74b7a4e0bd$export$2e2bcd8739ae039(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new $08115c74b7a4e0bd$export$2e2bcd8739ae039(this.x - other.x, this.y - other.y);
    }
    multiply(scalar) {
        return new $08115c74b7a4e0bd$export$2e2bcd8739ae039(this.x * scalar, this.y * scalar);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) return new $08115c74b7a4e0bd$export$2e2bcd8739ae039(0, 0);
        return new $08115c74b7a4e0bd$export$2e2bcd8739ae039(this.x / mag, this.y / mag);
    }
}


class $e9381f474ff620cc$export$2e2bcd8739ae039 {
    static create(obj) {
        (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).GameObjects.push(new obj());
    }
    start() {}
    update() {}
    render() {
        if (this.sprite) this.sprite.render();
    }
    constructor(){
        this.transform = new (0, $08115c74b7a4e0bd$export$2e2bcd8739ae039)(0, 0);
        this.sprite = null;
        this.tag = "not defined";
    }
}


class $94db9bb1e19ed727$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.events = new Array;
    })();
    static #_1 = (()=>{
        this.mapper = new Map();
    })();
    static initialize() {
        document.addEventListener("keydown", (keyboard)=>{
            $94db9bb1e19ed727$export$2e2bcd8739ae039.mapper.set(keyboard.key, true);
            this.events.forEach((e)=>{
                e(keyboard);
            });
        });
        document.addEventListener("keyup", (e)=>$94db9bb1e19ed727$export$2e2bcd8739ae039.mapper.set(e.key, false));
    }
    static getKeyDown(key) {
        return $94db9bb1e19ed727$export$2e2bcd8739ae039.mapper.get(key);
    }
}


var $c79c3a840d79a37e$var$GamaSourceTime;
(function(GamaSourceTime) {
    GamaSourceTime[GamaSourceTime["SECOND"] = 1000] = "SECOND";
})($c79c3a840d79a37e$var$GamaSourceTime || ($c79c3a840d79a37e$var$GamaSourceTime = {}));
var $c79c3a840d79a37e$export$2e2bcd8739ae039 = $c79c3a840d79a37e$var$GamaSourceTime;


class $9be78fd010afcf3c$export$2e2bcd8739ae039 {
    constructor(maxFPS){
        this.FPS = 0;
        this.DeltaTime = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.frameInterval = (0, $c79c3a840d79a37e$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    updateFrame(currentTime) {
        this.frameCount++;
        if (currentTime > this.lastFrameTime + (0, $c79c3a840d79a37e$export$2e2bcd8739ae039).SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }
    updateLastFrame() {
        this.lastFrameTime = performance.now();
    }
    setMaxFPS(maxFPS) {
        this.frameInterval = (0, $c79c3a840d79a37e$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    getDeltaTime(currentTime) {
        if (currentTime) return (currentTime - this.lastFrameTime) / (0, $c79c3a840d79a37e$export$2e2bcd8739ae039).SECOND;
        return this.DeltaTime;
    }
    getFrameInterval() {
        return this.frameInterval;
    }
}



var $0e52282bd7cacc2f$export$2e2bcd8739ae039 = ()=>{
    document.body.style.boxSizing = "boxSizing";
    document.body.style.margin = "0";
    const game = document.createElement("canvas");
    game.id = "game";
    game.style.position = "absolute";
    game.style.top = "0";
    game.style.bottom = "0";
    game.style.left = "0";
    game.style.right = "0";
    game.width = (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).window.WIDTH;
    game.height = (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).window.HEIGHT;
    (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).window.addEvent(()=>{
        game.width = (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).window.WIDTH;
        game.height = (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).window.HEIGHT;
    });
    document.body.appendChild(game);
};


class $58cc35928f5b21f0$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.EVENTS = new Array();
    })();
    constructor(){
        this.size = {
            getWidth: (percentage)=>this.WIDTH * (percentage / 100),
            getHeight: (percentage)=>this.HEIGHT * (percentage / 100)
        };
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
    }
    addEvent(ev) {
        $58cc35928f5b21f0$export$2e2bcd8739ae039.EVENTS.push(ev);
        window.addEventListener("resize", ()=>{
            this.WIDTH = window.innerWidth;
            this.HEIGHT = window.innerHeight;
            $58cc35928f5b21f0$export$2e2bcd8739ae039.EVENTS.forEach((e)=>{
                e();
            });
        });
    }
    getScale() {
        return this.WIDTH / this.HEIGHT;
    }
}





class $b9476ce5e7489a8e$export$2e2bcd8739ae039 {
    constructor(){
        this.reference = new (0, $08115c74b7a4e0bd$export$2e2bcd8739ae039)(0, 0);
        this.width = 0;
        this.height = 0;
    }
}



class $59f2c5857d98d905$export$2e2bcd8739ae039 extends (0, $b9476ce5e7489a8e$export$2e2bcd8739ae039) {
    constructor(reference, width, height, color){
        super();
        this.reference = reference;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}





class $c4d1796e1253327f$export$2e2bcd8739ae039 extends (0, $59f2c5857d98d905$export$2e2bcd8739ae039) {
    constructor(reference, width, height, color){
        super(reference, width, height, color);
    }
    render() {
        if (this.reference instanceof (0, $e9381f474ff620cc$export$2e2bcd8739ae039)) {
            (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).ctx.fillStyle = this.color;
            (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).ctx.fillRect(this.reference.transform.x, this.reference.transform.y, this.width, this.height);
            return;
        }
        (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).ctx.fillStyle = this.color;
        (0, $f8bbed27444dc2b3$export$2e2bcd8739ae039).ctx.fillRect(this.reference.x, this.reference.y, this.width, this.height);
    }
}


class $f8bbed27444dc2b3$export$d36076abcf594543 {
    static #_ = (()=>{
        this.GameObjects = new Array();
    })();
    constructor(config){
        this.main = ()=>{};
        $f8bbed27444dc2b3$export$d36076abcf594543.window = new (0, $58cc35928f5b21f0$export$2e2bcd8739ae039)();
        (0, $0e52282bd7cacc2f$export$2e2bcd8739ae039)();
        (0, $94db9bb1e19ed727$export$2e2bcd8739ae039).initialize();
        this.time = new (0, $9be78fd010afcf3c$export$2e2bcd8739ae039)(config?.maxFPS ?? 60);
        $f8bbed27444dc2b3$export$d36076abcf594543.state = (0, $d138717687ddda30$export$2e2bcd8739ae039).CLOSED;
        $f8bbed27444dc2b3$export$d36076abcf594543.canvas = document.querySelector("#game");
        $f8bbed27444dc2b3$export$d36076abcf594543.ctx = $f8bbed27444dc2b3$export$d36076abcf594543.canvas.getContext("2d");
    }
    start() {
        this.main();
        $f8bbed27444dc2b3$export$d36076abcf594543.GameObjects.forEach((g)=>g.start());
    }
    update() {
        $f8bbed27444dc2b3$export$d36076abcf594543.GameObjects.forEach((g)=>g.update());
    }
    render() {
        $f8bbed27444dc2b3$export$d36076abcf594543.ctx.clearRect(0, 0, $f8bbed27444dc2b3$export$d36076abcf594543.window.WIDTH, $f8bbed27444dc2b3$export$d36076abcf594543.window.HEIGHT);
        $f8bbed27444dc2b3$export$d36076abcf594543.GameObjects.forEach((g)=>g.render());
    }
    loop(currentTime) {
        try {
            if ($f8bbed27444dc2b3$export$d36076abcf594543.state != (0, $d138717687ddda30$export$2e2bcd8739ae039).CLOSED && $f8bbed27444dc2b3$export$d36076abcf594543.state != (0, $d138717687ddda30$export$2e2bcd8739ae039).CRASHED) {
                requestAnimationFrame((currentTime)=>this.loop(currentTime));
                this.time.DeltaTime = this.time.getDeltaTime(currentTime);
                if (this.time.DeltaTime >= this.time.getFrameInterval()) return;
                if ($f8bbed27444dc2b3$export$d36076abcf594543.state != (0, $d138717687ddda30$export$2e2bcd8739ae039).STOPPED) this.update();
                this.render();
                this.time.updateFrame(currentTime);
            }
        } catch (err) {
            console.error(err);
            $f8bbed27444dc2b3$export$d36076abcf594543.state = (0, $d138717687ddda30$export$2e2bcd8739ae039).CRASHED;
        }
    }
    run() {
        this.start();
        $f8bbed27444dc2b3$export$d36076abcf594543.state = (0, $d138717687ddda30$export$2e2bcd8739ae039).RUNNING;
        this.time.updateLastFrame();
        requestAnimationFrame((currentTime)=>this.loop(currentTime));
    }
    static stop() {
        $f8bbed27444dc2b3$export$d36076abcf594543.state = (0, $d138717687ddda30$export$2e2bcd8739ae039).STOPPED;
    }
    static resume() {
        $f8bbed27444dc2b3$export$d36076abcf594543.state = (0, $d138717687ddda30$export$2e2bcd8739ae039).RUNNING;
    }
    static exit() {
        $f8bbed27444dc2b3$export$d36076abcf594543.state = (0, $d138717687ddda30$export$2e2bcd8739ae039).CLOSED;
    }
    static falied() {
        $f8bbed27444dc2b3$export$d36076abcf594543.state = (0, $d138717687ddda30$export$2e2bcd8739ae039).CRASHED;
    }
}
var $f8bbed27444dc2b3$export$2e2bcd8739ae039 = $f8bbed27444dc2b3$export$d36076abcf594543;


export {$f8bbed27444dc2b3$export$d36076abcf594543 as GamaSource, $f8bbed27444dc2b3$export$2e2bcd8739ae039 as default, $d138717687ddda30$export$2e2bcd8739ae039 as GamaSourceState, $c79c3a840d79a37e$export$2e2bcd8739ae039 as GamaSourceTime, $8ada8c2f2e8cd214$export$2e2bcd8739ae039 as GamaSourceConfig, $e9381f474ff620cc$export$2e2bcd8739ae039 as GameObject, $94db9bb1e19ed727$export$2e2bcd8739ae039 as KeyBoard, $08115c74b7a4e0bd$export$2e2bcd8739ae039 as Vector2, $9be78fd010afcf3c$export$2e2bcd8739ae039 as TimeController, $b9476ce5e7489a8e$export$2e2bcd8739ae039 as Sprite, $59f2c5857d98d905$export$2e2bcd8739ae039 as ShapeSprite, $c4d1796e1253327f$export$2e2bcd8739ae039 as SquareSprite, $0e52282bd7cacc2f$export$2e2bcd8739ae039 as GameCanvas, $58cc35928f5b21f0$export$2e2bcd8739ae039 as GameWindow};
//# sourceMappingURL=GamaSource.js.map
