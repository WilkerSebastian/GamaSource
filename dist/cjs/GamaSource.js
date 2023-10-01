function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $be9b019dcf88b1d2$export$2e2bcd8739ae039);
var $50112ce2d29f6812$var$GamaSourceState;
(function(GamaSourceState) {
    GamaSourceState[GamaSourceState["CLOSED"] = 0] = "CLOSED";
    GamaSourceState[GamaSourceState["LOADING"] = 1] = "LOADING";
    GamaSourceState[GamaSourceState["RUNNING"] = 2] = "RUNNING";
    GamaSourceState[GamaSourceState["STOPPED"] = 3] = "STOPPED";
    GamaSourceState[GamaSourceState["CRASHED"] = 4] = "CRASHED";
})($50112ce2d29f6812$var$GamaSourceState || ($50112ce2d29f6812$var$GamaSourceState = {}));
var $50112ce2d29f6812$export$2e2bcd8739ae039 = $50112ce2d29f6812$var$GamaSourceState;


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


var $52d5931dd5a723d2$var$Time;
(function(Time) {
    Time[Time["SECOND"] = 1000] = "SECOND";
})($52d5931dd5a723d2$var$Time || ($52d5931dd5a723d2$var$Time = {}));
var $52d5931dd5a723d2$export$2e2bcd8739ae039 = $52d5931dd5a723d2$var$Time;


class $7a49025a9178b059$export$2e2bcd8739ae039 {
    constructor(maxFPS){
        this.DeltaTime = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.setMaxFPS(maxFPS);
    }
    updateFrame(currentTime) {
        this.frameCount++;
        if (currentTime > this.lastFrameTime + (0, $52d5931dd5a723d2$export$2e2bcd8739ae039).SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }
    updateLastFrame() {
        this.lastFrameTime = performance.now();
    }
    setMaxFPS(maxFPS) {
        this.frameInterval = (0, $52d5931dd5a723d2$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    getDeltaTime(currentTime) {
        if (currentTime) return (currentTime - this.lastFrameTime) / (0, $52d5931dd5a723d2$export$2e2bcd8739ae039).SECOND;
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


class $be9b019dcf88b1d2$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.GameObjects = new Array();
    })();
    constructor(config){
        this.main = ()=>{};
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.window = new (0, $d56f756e1dc733a9$export$2e2bcd8739ae039)();
        (0, $6e1d1d3cd91f3210$export$2e2bcd8739ae039)();
        (0, $ec5426ac07e1e730$export$2e2bcd8739ae039).initialize();
        this.time = new (0, $7a49025a9178b059$export$2e2bcd8739ae039)(config?.maxFPS ?? 60);
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.state = (0, $50112ce2d29f6812$export$2e2bcd8739ae039).CLOSED;
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.canvas = document.querySelector("#game");
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.ctx = $be9b019dcf88b1d2$export$2e2bcd8739ae039.canvas.getContext("2d");
    }
    start() {
        this.main();
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.GameObjects.forEach((g)=>g.start());
    }
    update() {
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.GameObjects.forEach((g)=>g.update());
    }
    render() {
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.ctx.clearRect(0, 0, $be9b019dcf88b1d2$export$2e2bcd8739ae039.window.WIDTH, $be9b019dcf88b1d2$export$2e2bcd8739ae039.window.HEIGHT);
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.GameObjects.forEach((g)=>g.render());
    }
    loop(currentTime) {
        try {
            if ($be9b019dcf88b1d2$export$2e2bcd8739ae039.state != (0, $50112ce2d29f6812$export$2e2bcd8739ae039).CLOSED && $be9b019dcf88b1d2$export$2e2bcd8739ae039.state != (0, $50112ce2d29f6812$export$2e2bcd8739ae039).CRASHED) {
                requestAnimationFrame((currentTime)=>this.loop(currentTime));
                this.time.DeltaTime = this.time.getDeltaTime(currentTime);
                if (this.time.DeltaTime >= this.time.getFrameInterval()) return;
                if ($be9b019dcf88b1d2$export$2e2bcd8739ae039.state != (0, $50112ce2d29f6812$export$2e2bcd8739ae039).STOPPED) this.update();
                this.render();
                this.time.updateFrame(currentTime);
            }
        } catch (err) {
            console.error(err);
            $be9b019dcf88b1d2$export$2e2bcd8739ae039.state = (0, $50112ce2d29f6812$export$2e2bcd8739ae039).CRASHED;
        }
    }
    run() {
        this.start();
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.state = (0, $50112ce2d29f6812$export$2e2bcd8739ae039).RUNNING;
        this.time.updateLastFrame();
        requestAnimationFrame((currentTime)=>this.loop(currentTime));
    }
    static stop() {
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.state = (0, $50112ce2d29f6812$export$2e2bcd8739ae039).STOPPED;
    }
    static resume() {
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.state = (0, $50112ce2d29f6812$export$2e2bcd8739ae039).RUNNING;
    }
    static exit() {
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.state = (0, $50112ce2d29f6812$export$2e2bcd8739ae039).CLOSED;
    }
    static falied() {
        $be9b019dcf88b1d2$export$2e2bcd8739ae039.state = (0, $50112ce2d29f6812$export$2e2bcd8739ae039).CRASHED;
    }
}


//# sourceMappingURL=GamaSource.js.map
