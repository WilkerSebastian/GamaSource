var $c89952bee601d42e$var$GamaSourceState;
(function(GamaSourceState) {
    GamaSourceState[GamaSourceState["CLOSED"] = 0] = "CLOSED";
    GamaSourceState[GamaSourceState["LOADING"] = 1] = "LOADING";
    GamaSourceState[GamaSourceState["RUNNING"] = 2] = "RUNNING";
    GamaSourceState[GamaSourceState["STOPPED"] = 3] = "STOPPED";
    GamaSourceState[GamaSourceState["CRASHED"] = 4] = "CRASHED";
})($c89952bee601d42e$var$GamaSourceState || ($c89952bee601d42e$var$GamaSourceState = {}));
var $c89952bee601d42e$export$2e2bcd8739ae039 = $c89952bee601d42e$var$GamaSourceState;


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


var $f89166e6eb7897a7$var$Time;
(function(Time) {
    Time[Time["SECOND"] = 1000] = "SECOND";
})($f89166e6eb7897a7$var$Time || ($f89166e6eb7897a7$var$Time = {}));
var $f89166e6eb7897a7$export$2e2bcd8739ae039 = $f89166e6eb7897a7$var$Time;


class $9be78fd010afcf3c$export$2e2bcd8739ae039 {
    constructor(maxFPS){
        this.DeltaTime = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.setMaxFPS(maxFPS);
    }
    updateFrame(currentTime) {
        this.frameCount++;
        if (currentTime > this.lastFrameTime + (0, $f89166e6eb7897a7$export$2e2bcd8739ae039).SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }
    updateLastFrame() {
        this.lastFrameTime = performance.now();
    }
    setMaxFPS(maxFPS) {
        this.frameInterval = (0, $f89166e6eb7897a7$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    getDeltaTime(currentTime) {
        if (currentTime) return (currentTime - this.lastFrameTime) / (0, $f89166e6eb7897a7$export$2e2bcd8739ae039).SECOND;
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


class $f8bbed27444dc2b3$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.GameObjects = new Array();
    })();
    constructor(config){
        this.main = ()=>{};
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.window = new (0, $58cc35928f5b21f0$export$2e2bcd8739ae039)();
        (0, $0e52282bd7cacc2f$export$2e2bcd8739ae039)();
        (0, $94db9bb1e19ed727$export$2e2bcd8739ae039).initialize();
        this.time = new (0, $9be78fd010afcf3c$export$2e2bcd8739ae039)(config?.maxFPS ?? 60);
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.state = (0, $c89952bee601d42e$export$2e2bcd8739ae039).CLOSED;
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.canvas = document.querySelector("#game");
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.ctx = $f8bbed27444dc2b3$export$2e2bcd8739ae039.canvas.getContext("2d");
    }
    start() {
        this.main();
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.GameObjects.forEach((g)=>g.start());
    }
    update() {
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.GameObjects.forEach((g)=>g.update());
    }
    render() {
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.ctx.clearRect(0, 0, $f8bbed27444dc2b3$export$2e2bcd8739ae039.window.WIDTH, $f8bbed27444dc2b3$export$2e2bcd8739ae039.window.HEIGHT);
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.GameObjects.forEach((g)=>g.render());
    }
    loop(currentTime) {
        try {
            if ($f8bbed27444dc2b3$export$2e2bcd8739ae039.state != (0, $c89952bee601d42e$export$2e2bcd8739ae039).CLOSED && $f8bbed27444dc2b3$export$2e2bcd8739ae039.state != (0, $c89952bee601d42e$export$2e2bcd8739ae039).CRASHED) {
                requestAnimationFrame((currentTime)=>this.loop(currentTime));
                this.time.DeltaTime = this.time.getDeltaTime(currentTime);
                if (this.time.DeltaTime >= this.time.getFrameInterval()) return;
                if ($f8bbed27444dc2b3$export$2e2bcd8739ae039.state != (0, $c89952bee601d42e$export$2e2bcd8739ae039).STOPPED) this.update();
                this.render();
                this.time.updateFrame(currentTime);
            }
        } catch (err) {
            console.error(err);
            $f8bbed27444dc2b3$export$2e2bcd8739ae039.state = (0, $c89952bee601d42e$export$2e2bcd8739ae039).CRASHED;
        }
    }
    run() {
        this.start();
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.state = (0, $c89952bee601d42e$export$2e2bcd8739ae039).RUNNING;
        this.time.updateLastFrame();
        requestAnimationFrame((currentTime)=>this.loop(currentTime));
    }
    static stop() {
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.state = (0, $c89952bee601d42e$export$2e2bcd8739ae039).STOPPED;
    }
    static resume() {
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.state = (0, $c89952bee601d42e$export$2e2bcd8739ae039).RUNNING;
    }
    static exit() {
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.state = (0, $c89952bee601d42e$export$2e2bcd8739ae039).CLOSED;
    }
    static falied() {
        $f8bbed27444dc2b3$export$2e2bcd8739ae039.state = (0, $c89952bee601d42e$export$2e2bcd8739ae039).CRASHED;
    }
}


export {$f8bbed27444dc2b3$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=GamaSource.js.map
