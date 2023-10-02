function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "GamaSource", () => $be9b019dcf88b1d2$export$d36076abcf594543);
$parcel$export(module.exports, "default", () => $be9b019dcf88b1d2$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GamaSourceState", () => $a7f36dda3f4a8094$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GamaSourceTime", () => $5a716fab7e727bed$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GamaSourceConfig", () => $1d90ffda7b1fdff4$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GameObject", () => $093225c56a233e0f$export$2e2bcd8739ae039);
$parcel$export(module.exports, "KeyBoard", () => $ec5426ac07e1e730$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Vector2", () => $fbe8591a509f65b2$export$2e2bcd8739ae039);
$parcel$export(module.exports, "TimeController", () => $7a49025a9178b059$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Sprite", () => $966979a7503d5337$export$2e2bcd8739ae039);
$parcel$export(module.exports, "ShapeSprite", () => $b3c2a48e0c9708a8$export$2e2bcd8739ae039);
$parcel$export(module.exports, "SquareSprite", () => $16a63ba451fb476c$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GameCanvas", () => $6e1d1d3cd91f3210$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GameWindow", () => $d56f756e1dc733a9$export$2e2bcd8739ae039);
var $a7f36dda3f4a8094$var$GamaSourceState;
(function(GamaSourceState) {
    GamaSourceState[GamaSourceState["CLOSED"] = 0] = "CLOSED";
    GamaSourceState[GamaSourceState["LOADING"] = 1] = "LOADING";
    GamaSourceState[GamaSourceState["RUNNING"] = 2] = "RUNNING";
    GamaSourceState[GamaSourceState["STOPPED"] = 3] = "STOPPED";
    GamaSourceState[GamaSourceState["CRASHED"] = 4] = "CRASHED";
})($a7f36dda3f4a8094$var$GamaSourceState || ($a7f36dda3f4a8094$var$GamaSourceState = {}));
var $a7f36dda3f4a8094$export$2e2bcd8739ae039 = $a7f36dda3f4a8094$var$GamaSourceState;


class $1d90ffda7b1fdff4$export$2e2bcd8739ae039 {
}



class $fbe8591a509f65b2$export$2e2bcd8739ae039 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new $fbe8591a509f65b2$export$2e2bcd8739ae039(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new $fbe8591a509f65b2$export$2e2bcd8739ae039(this.x - other.x, this.y - other.y);
    }
    multiply(scalar) {
        return new $fbe8591a509f65b2$export$2e2bcd8739ae039(this.x * scalar, this.y * scalar);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) return new $fbe8591a509f65b2$export$2e2bcd8739ae039(0, 0);
        return new $fbe8591a509f65b2$export$2e2bcd8739ae039(this.x / mag, this.y / mag);
    }
}


class $093225c56a233e0f$export$2e2bcd8739ae039 {
    static create(obj) {
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).GameObjects.push(new obj());
    }
    start() {}
    update() {}
    render() {
        if (this.sprite) this.sprite.render();
    }
    constructor(){
        this.transform = new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0);
        this.sprite = null;
        this.tag = "not defined";
    }
}


class $ec5426ac07e1e730$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.events = new Array;
    })();
    static #_1 = (()=>{
        this.mapper = new Map();
    })();
    static initialize() {
        document.addEventListener("keydown", (keyboard)=>{
            $ec5426ac07e1e730$export$2e2bcd8739ae039.mapper.set(keyboard.key, true);
            this.events.forEach((e)=>{
                e(keyboard);
            });
        });
        document.addEventListener("keyup", (e)=>$ec5426ac07e1e730$export$2e2bcd8739ae039.mapper.set(e.key, false));
    }
    static getKeyDown(key) {
        return $ec5426ac07e1e730$export$2e2bcd8739ae039.mapper.get(key);
    }
}


var $5a716fab7e727bed$var$GamaSourceTime;
(function(GamaSourceTime) {
    GamaSourceTime[GamaSourceTime["SECOND"] = 1000] = "SECOND";
})($5a716fab7e727bed$var$GamaSourceTime || ($5a716fab7e727bed$var$GamaSourceTime = {}));
var $5a716fab7e727bed$export$2e2bcd8739ae039 = $5a716fab7e727bed$var$GamaSourceTime;


class $7a49025a9178b059$export$2e2bcd8739ae039 {
    constructor(maxFPS){
        this.FPS = 0;
        this.DeltaTime = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.frameInterval = (0, $5a716fab7e727bed$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    updateFrame(currentTime) {
        this.frameCount++;
        if (currentTime > this.lastFrameTime + (0, $5a716fab7e727bed$export$2e2bcd8739ae039).SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }
    updateLastFrame() {
        this.lastFrameTime = performance.now();
    }
    setMaxFPS(maxFPS) {
        this.frameInterval = (0, $5a716fab7e727bed$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    getDeltaTime(currentTime) {
        if (currentTime) return (currentTime - this.lastFrameTime) / (0, $5a716fab7e727bed$export$2e2bcd8739ae039).SECOND;
        return this.DeltaTime;
    }
    getFrameInterval() {
        return this.frameInterval;
    }
}



var $6e1d1d3cd91f3210$export$2e2bcd8739ae039 = ()=>{
    document.body.style.boxSizing = "boxSizing";
    document.body.style.margin = "0";
    const game = document.createElement("canvas");
    game.id = "game";
    game.style.position = "absolute";
    game.style.top = "0";
    game.style.bottom = "0";
    game.style.left = "0";
    game.style.right = "0";
    game.width = (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).window.WIDTH;
    game.height = (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).window.HEIGHT;
    (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).window.addEvent(()=>{
        game.width = (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).window.WIDTH;
        game.height = (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).window.HEIGHT;
    });
    document.body.appendChild(game);
};


class $d56f756e1dc733a9$export$2e2bcd8739ae039 {
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
        $d56f756e1dc733a9$export$2e2bcd8739ae039.EVENTS.push(ev);
        window.addEventListener("resize", ()=>{
            this.WIDTH = window.innerWidth;
            this.HEIGHT = window.innerHeight;
            $d56f756e1dc733a9$export$2e2bcd8739ae039.EVENTS.forEach((e)=>{
                e();
            });
        });
    }
    getScale() {
        return this.WIDTH / this.HEIGHT;
    }
}





class $966979a7503d5337$export$2e2bcd8739ae039 {
    constructor(){
        this.reference = new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0);
        this.width = 0;
        this.height = 0;
    }
}



class $b3c2a48e0c9708a8$export$2e2bcd8739ae039 extends (0, $966979a7503d5337$export$2e2bcd8739ae039) {
    constructor(reference, width, height, color){
        super();
        this.reference = reference;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}





class $16a63ba451fb476c$export$2e2bcd8739ae039 extends (0, $b3c2a48e0c9708a8$export$2e2bcd8739ae039) {
    constructor(reference, width, height, color){
        super(reference, width, height, color);
    }
    render() {
        if (this.reference instanceof (0, $093225c56a233e0f$export$2e2bcd8739ae039)) {
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fillStyle = this.color;
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fillRect(this.reference.transform.x, this.reference.transform.y, this.width, this.height);
            return;
        }
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fillStyle = this.color;
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fillRect(this.reference.x, this.reference.y, this.width, this.height);
    }
}


class $be9b019dcf88b1d2$export$d36076abcf594543 {
    static #_ = (()=>{
        this.GameObjects = new Array();
    })();
    constructor(config){
        this.main = ()=>{};
        $be9b019dcf88b1d2$export$d36076abcf594543.window = new (0, $d56f756e1dc733a9$export$2e2bcd8739ae039)();
        (0, $6e1d1d3cd91f3210$export$2e2bcd8739ae039)();
        (0, $ec5426ac07e1e730$export$2e2bcd8739ae039).initialize();
        this.time = new (0, $7a49025a9178b059$export$2e2bcd8739ae039)(config?.maxFPS ?? 60);
        $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).CLOSED;
        $be9b019dcf88b1d2$export$d36076abcf594543.canvas = document.querySelector("#game");
        $be9b019dcf88b1d2$export$d36076abcf594543.ctx = $be9b019dcf88b1d2$export$d36076abcf594543.canvas.getContext("2d");
    }
    start() {
        this.main();
        $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects.forEach((g)=>g.start());
    }
    update() {
        $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects.forEach((g)=>g.update());
    }
    render() {
        $be9b019dcf88b1d2$export$d36076abcf594543.ctx.clearRect(0, 0, $be9b019dcf88b1d2$export$d36076abcf594543.window.WIDTH, $be9b019dcf88b1d2$export$d36076abcf594543.window.HEIGHT);
        $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects.forEach((g)=>g.render());
    }
    loop(currentTime) {
        try {
            if ($be9b019dcf88b1d2$export$d36076abcf594543.state != (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).CLOSED && $be9b019dcf88b1d2$export$d36076abcf594543.state != (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).CRASHED) {
                requestAnimationFrame((currentTime)=>this.loop(currentTime));
                this.time.DeltaTime = this.time.getDeltaTime(currentTime);
                if (this.time.DeltaTime >= this.time.getFrameInterval()) return;
                if ($be9b019dcf88b1d2$export$d36076abcf594543.state != (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).STOPPED) this.update();
                this.render();
                this.time.updateFrame(currentTime);
            }
        } catch (err) {
            console.error(err);
            $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).CRASHED;
        }
    }
    run() {
        this.start();
        $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).RUNNING;
        this.time.updateLastFrame();
        requestAnimationFrame((currentTime)=>this.loop(currentTime));
    }
    static stop() {
        $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).STOPPED;
    }
    static resume() {
        $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).RUNNING;
    }
    static exit() {
        $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).CLOSED;
    }
    static falied() {
        $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).CRASHED;
    }
}
var $be9b019dcf88b1d2$export$2e2bcd8739ae039 = $be9b019dcf88b1d2$export$d36076abcf594543;


//# sourceMappingURL=GamaSource.js.map
