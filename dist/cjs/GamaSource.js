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
$parcel$export(module.exports, "TimeGame", () => $5e379901baf0d859$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GamaSourceConfig", () => $1d90ffda7b1fdff4$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GameObject", () => $093225c56a233e0f$export$2e2bcd8739ae039);
$parcel$export(module.exports, "KeyBoard", () => $ec5426ac07e1e730$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Mouse", () => $eb2672c705c386be$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Vector2", () => $fbe8591a509f65b2$export$2e2bcd8739ae039);
$parcel$export(module.exports, "TimeController", () => $bcca9c904f06c83e$export$2e2bcd8739ae039);
$parcel$export(module.exports, "Sprite", () => $966979a7503d5337$export$2e2bcd8739ae039);
$parcel$export(module.exports, "ShapeSprite", () => $b3c2a48e0c9708a8$export$2e2bcd8739ae039);
$parcel$export(module.exports, "SquareSprite", () => $16a63ba451fb476c$export$2e2bcd8739ae039);
$parcel$export(module.exports, "StaticSprite", () => $0a3ada9b62f29c2d$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GameCanvas", () => $6e1d1d3cd91f3210$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GameWindow", () => $d56f756e1dc733a9$export$2e2bcd8739ae039);
$parcel$export(module.exports, "GameMath", () => $5a334b166dfa1be5$export$2e2bcd8739ae039);
$parcel$export(module.exports, "FrameComponent", () => $7a794ae910495cf5$export$2e2bcd8739ae039);
$parcel$export(module.exports, "FramePanel", () => $b204872e9decb3de$export$2e2bcd8739ae039);
$parcel$export(module.exports, "FrameText", () => $fcb37ed2e27d49de$export$2e2bcd8739ae039);
class $a7f36dda3f4a8094$var$GamaSourceState {
    static #_ = (()=>{
        this.CLOSED = 0;
    })();
    static #_1 = (()=>{
        this.LOADING = 1;
    })();
    static #_2 = (()=>{
        this.RUNNING = 2;
    })();
    static #_3 = (()=>{
        this.STOPPED = 3;
    })();
    static #_4 = (()=>{
        this.CRASHED = 4;
    })();
}
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
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).GameObjects = (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).GameObjects.sort((a, b)=>a.layer - b.layer);
    }
    destroy() {
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).GameObjects = (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).GameObjects.filter((obj)=>obj != this);
    }
    static getElementByTag(tag) {
        return (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).GameObjects.filter((obj)=>obj.tag == tag)[0];
    }
    static getAllElementsByTag(tag) {
        return (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).GameObjects.filter((obj)=>obj.tag == tag);
    }
    start() {}
    update() {}
    gameUpdate() {
        if (this.visible) this.update();
    }
    render() {
        if (this.sprite && this.visible) this.sprite.render();
    }
    constructor(){
        this.transform = new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0);
        this.sprite = null;
        this.visible = true;
        this.layer = 1;
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


class $5e379901baf0d859$var$GameTime {
}
var $5e379901baf0d859$export$2e2bcd8739ae039 = $5e379901baf0d859$var$GameTime;


class $bcca9c904f06c83e$export$2e2bcd8739ae039 {
    constructor(maxFPS){
        this.FPS = 0;
        this.DeltaTime = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.frameInterval = (0, $5e379901baf0d859$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    updateFrame(currentTime) {
        this.frameCount++;
        if (currentTime > this.lastFrameTime + (0, $5e379901baf0d859$export$2e2bcd8739ae039).SECOND) {
            this.FPS = this.frameCount;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }
    updateLastFrame() {
        this.lastFrameTime = performance.now();
    }
    setMaxFPS(maxFPS) {
        this.frameInterval = (0, $5e379901baf0d859$export$2e2bcd8739ae039).SECOND / maxFPS;
    }
    getDeltaTime(currentTime) {
        if (currentTime) return (currentTime - this.lastFrameTime) / (0, $5e379901baf0d859$export$2e2bcd8739ae039).SECOND;
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
    constructor(reference, width, height){
        this.reference = new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0);
        this.width = 0;
        this.height = 0;
        this.reference = reference;
        this.width = width;
        this.height = height;
    }
}



class $b3c2a48e0c9708a8$export$2e2bcd8739ae039 extends (0, $966979a7503d5337$export$2e2bcd8739ae039) {
    constructor(reference, width, height, color){
        super(reference, width, height);
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




class $157157e820ac0459$export$2e2bcd8739ae039 {
    constructor(path){
        this.source = new Image();
        this.source.addEventListener("load", ()=>{
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).LOAD++;
        });
        this.source.src = path;
        const name = path.split("/");
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ASSETS.set(name[name.length - 1], this);
    }
    getSource() {
        return this.source;
    }
}



class $0a3ada9b62f29c2d$export$2e2bcd8739ae039 extends (0, $966979a7503d5337$export$2e2bcd8739ae039) {
    constructor(source, reference, width, height){
        super(reference, width, height);
        const image = (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ASSETS.get(source);
        if (!image) {
            console.error("Error on instace of StaticSprite " + source);
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).falied();
            this.image = new (0, $157157e820ac0459$export$2e2bcd8739ae039)("failed");
            return;
        }
        this.image = image;
    }
    getImage() {
        return this.image;
    }
    render() {
        if (this.reference instanceof (0, $093225c56a233e0f$export$2e2bcd8739ae039)) {
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.drawImage(this.image.getSource(), this.reference.transform.x, this.reference.transform.y, this.width, this.height);
            return;
        }
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.drawImage(this.image.getSource(), this.reference.x, this.reference.y, this.width, this.height);
    }
}


class $5a334b166dfa1be5$export$2e2bcd8739ae039 {
    static random(min, max) {
        min = min ?? 0;
        max = max ?? 1;
        return (Math.random() + min) * max;
    }
    static randomInteger(min, max) {
        min = min ?? 0;
        max = max ?? 1;
        return this.parseInt((Math.random() + min) * max);
    }
    static parseInt(x) {
        return parseInt(x.toString());
    }
    static root(x, exp) {
        return x ** 1 / exp;
    }
    static distance(v1, v2) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }
    static degressToRadian(degress) {
        return degress * Math.PI / 180;
    }
    static radianToDegress(radian) {
        return radian * 180 / Math.PI;
    }
}



class $53e27565d1108d13$export$2e2bcd8739ae039 {
    constructor(path){
        this.source = new Audio();
        this.source.addEventListener("load", ()=>{
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).LOAD++;
        });
        this.source.src = path;
        const name = path.split("/");
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ASSETS.set(name[name.length - 1], this);
    }
    pause() {
        this.pause();
    }
    setLoop(loop) {
        this.source.loop = loop;
    }
    setVolume(volume) {
        this.source.volume = volume / 100;
    }
    getVolume() {
        return this.source.volume;
    }
    async play() {
        await this.source.play();
    }
    getSource() {
        return this.source;
    }
}




const $529c00b41553c4f3$var$atomic = "data:image/png;base64,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";
var $529c00b41553c4f3$export$2e2bcd8739ae039 = $529c00b41553c4f3$var$atomic;


const $ebd3c9f6ee44955c$var$source = "data:image/png;base64,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";
var $ebd3c9f6ee44955c$export$2e2bcd8739ae039 = $ebd3c9f6ee44955c$var$source;


var $6a34e6f6a90b2c9f$export$2e2bcd8739ae039 = ()=>{
    const loader = document.createElement("div");
    loader.style.position = "absolute";
    loader.style.backgroundColor = "#0D1117";
    loader.style.top = "0";
    loader.style.bottom = "0";
    loader.style.left = "0";
    loader.style.right = "0";
    loader.style.display = "flex";
    loader.style.flexDirection = "column";
    loader.style.justifyContent = "center";
    loader.innerHTML = `

        <img id="logo-game" style="height:40vh;margin:auto;margin-bottom:0;margin-top:10vh;" src="${0, $529c00b41553c4f3$export$2e2bcd8739ae039}">

        <img id="text-game" style="width:50vw;height:10vh;margin:auto;margin-top:2.5vh;" src="${0, $ebd3c9f6ee44955c$export$2e2bcd8739ae039}">

        <div style="width:50vw;height:10vh;margin:auto;margin-top:2.5vh;background-color:gray;">
        
            <div id="bar-game" style="height:100%;width:0%;background-color:purple;"><div>

        </div>

    `;
    document.body.append(loader);
    let degress = 0;
    const rotate = ()=>{
        degress++;
        const img = document.querySelector("#logo-game");
        img.style.transform = `rotate(${degress}deg)`;
        if (degress >= 360) degress = 0;
    };
    const id = setInterval(()=>{
        const bar = document.querySelector("#bar-game");
        bar.style.width = `${(0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).LOAD * 100 / (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ASSETS.size}%`;
        if ((0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ASSETS.size == (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).LOAD) {
            loader.style.display = "none";
            clearInterval(id);
        } else rotate();
    }, 32);
};



class $eb2672c705c386be$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.events = new Array;
    })();
    static #_1 = (()=>{
        this.transform = new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0);
    })();
    static #_2 = (()=>{
        this.mapper = new Map;
    })();
    static #_3 = (()=>{
        this.pressed = false;
    })();
    static initialize() {
        document.addEventListener("mousemove", (e)=>{
            this.transform.set(e.clientX, e.clientY);
        });
        document.addEventListener("mousedown", (e)=>{
            this.mapper.set("mouse " + e.button, true);
            this.pressed = true;
        });
        document.addEventListener("mouseup", (e)=>{
            this.mapper.set("mouse " + e.button, false);
            this.pressed = false;
        });
    }
    static addEventClick(ev) {
        this.events.push(ev);
        document.addEventListener("mousedown", (m)=>{
            this.mapper.set("mouse " + m.button, true);
            this.pressed = true;
            this.events.forEach((e)=>{
                e(m);
            });
        });
    }
    static hasPressed() {
        return this.pressed;
    }
    static getButtonPressed(button) {
        if (typeof button == "number") return this.mapper.get("mouse" + button);
        return this.mapper.get(button);
    }
}



class $7a794ae910495cf5$export$2e2bcd8739ae039 {
    constructor(frame){
        this.father = null;
        this.childrens = new Array();
        this.position = new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0);
        this.width = 0;
        this.height = 0;
        this.visible = false;
        if (frame.father) this.setFather(frame.father);
        this.setBounds(frame.x, frame.y, frame.width, frame.height);
        this.visible = frame.visible ?? false;
    }
    setX(x) {
        const px = parseInt(x.toString());
        if (this.father) {
            if (typeof x == "string") {
                this.position.x = this.father.position.x + this.father.width * (px / 100);
                return;
            }
            this.position.x = this.father.position.x + px;
        }
        this.position.x = px;
    }
    sety(y) {
        const py = parseInt(y.toString());
        if (this.father) {
            if (typeof y == "string") {
                this.position.y = this.father.position.y + this.father.height * (py / 100);
                return;
            }
            this.position.y = this.father.position.y + py;
        }
        this.position.y = py;
    }
    setWidth(width) {
        const pw = parseInt(width.toString());
        if (this.father && typeof width == "string") {
            this.width = this.father.getWidth() * (pw / 100);
            return;
        }
        this.width = pw;
    }
    setHeight(height) {
        const ph = parseInt(height.toString());
        if (this.father && typeof height == "string") {
            this.height = this.father.getHeight() * (ph / 100);
            return;
        }
        this.height = ph;
    }
    setPosition(x, y) {
        this.setX(x);
        this.sety(y);
    }
    setSize(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }
    setBounds(x, y, width, height) {
        this.setPosition(x, y);
        this.setSize(width, height);
    }
    add(frame) {
        if (!this.father) frame.setFather(this);
        this.childrens.push(frame);
    }
    setFather(frame) {
        this.father = frame;
    }
    getFather() {
        return this.father;
    }
    getPosition() {
        return this.position;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    FrameRender() {
        if (this.visible) {
            this.render();
            this.childrens.forEach((e)=>{
                if (e.visible) e.render();
            });
        }
    }
    FrameUpdate() {
        this.update();
        this.childrens.forEach((e)=>{
            e.update();
        });
    }
    update() {}
    getChildrens() {
        return this.childrens;
    }
    setChildrens(childrens) {
        this.childrens = childrens;
    }
    render() {}
}




class $b204872e9decb3de$export$2e2bcd8739ae039 extends (0, $7a794ae910495cf5$export$2e2bcd8739ae039) {
    constructor(frame){
        super(frame);
        this.source = frame.source ?? "#fff";
        this.rounded = frame.rounded ?? 0;
        this.border = frame.border ?? {};
    }
    render() {
        if (this.border.color) (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.strokeStyle = this.border.color;
        if (this.border.size) {
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.save();
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.scale(1 + this.border.size / 100, 1 + this.border.size / 100);
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.strokeRect(this.getPosition().x, this.getPosition().y, this.width, this.height);
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.restore();
        }
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.beginPath();
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fillStyle = this.source;
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.roundRect(this.getPosition().x, this.getPosition().y, this.getWidth(), this.getHeight(), this.rounded);
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fill();
        (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.closePath();
    }
}




class $fcb37ed2e27d49de$export$2e2bcd8739ae039 extends (0, $7a794ae910495cf5$export$2e2bcd8739ae039) {
    constructor(frame){
        super({
            x: frame.x,
            y: frame.y,
            width: frame.width,
            height: 0,
            visible: frame.visible,
            father: frame.father
        });
        this.lines = [];
        this.fontSize = 0;
        this.font = "";
        this.color = frame.color ?? "#000";
        this.setFontSize(frame.fontSize ?? 11);
        this.setFont(frame.font ?? "ARIAL");
        this.setText(frame.text ?? "");
    }
    render() {
        this.lines.forEach((line, index)=>{
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.font = `${this.getFontSize()}px ${this.getFont()}`;
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fillStyle = this.color;
            (0, $be9b019dcf88b1d2$export$2e2bcd8739ae039).ctx.fillText(line, this.getPosition().x, this.getPosition().y * (index + 1), this.getWidth());
        });
    }
    setText(text) {
        const lines = [];
        const l = text.trim().split(" ");
        let line = "";
        for(let index = 0; index < l.length; index++){
            const word = l[index];
            if (word.length * this.fontSize > this.getWidth()) {
                lines.push(line.trim());
                line = word;
            } else line += word + " ";
            if (index == l.length - 1 && line) lines.push(line.trim());
        }
        this.setHeight(this.getFontSize() * lines.length);
        this.lines = lines.filter((word)=>word);
    }
    getText() {
        return this.lines.join(" ");
    }
    setFontSize(fontSize) {
        const fs = parseInt(fontSize.toString());
        const width = this.getFather()?.getWidth();
        if (typeof fontSize == "string" && width) {
            this.fontSize = width * (fs / 100);
            return;
        }
        this.fontSize = fs;
    }
    getFontSize() {
        return this.fontSize;
    }
    setFont(font) {
        this.font = font;
    }
    getFont() {
        return this.font;
    }
}


class $be9b019dcf88b1d2$export$d36076abcf594543 {
    static #_ = (()=>{
        this.LOAD = 0;
    })();
    static #_1 = (()=>{
        this.ASSETS = new Map;
    })();
    static #_2 = (()=>{
        this.GameObjects = new Array();
    })();
    static #_3 = (()=>{
        this.globalEnv = new Map();
    })();
    constructor(config){
        this.scenes = new Map();
        $be9b019dcf88b1d2$export$d36076abcf594543.window = new (0, $d56f756e1dc733a9$export$2e2bcd8739ae039)();
        const source = config?.background ?? "#787878";
        if (!Number.isNaN(parseInt(source.split("#").join(""), 16))) this.background = new (0, $16a63ba451fb476c$export$2e2bcd8739ae039)(new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0), $be9b019dcf88b1d2$export$d36076abcf594543.window.WIDTH, $be9b019dcf88b1d2$export$d36076abcf594543.window.HEIGHT, source);
        else {
            const name = $be9b019dcf88b1d2$export$d36076abcf594543.loader(source)[0];
            this.background = new (0, $0a3ada9b62f29c2d$export$2e2bcd8739ae039)(name, new (0, $fbe8591a509f65b2$export$2e2bcd8739ae039)(0, 0), $be9b019dcf88b1d2$export$d36076abcf594543.window.WIDTH, $be9b019dcf88b1d2$export$d36076abcf594543.window.HEIGHT);
        }
        $be9b019dcf88b1d2$export$d36076abcf594543.UI = new (0, $7a794ae910495cf5$export$2e2bcd8739ae039)({
            x: 0,
            y: 0,
            width: $be9b019dcf88b1d2$export$d36076abcf594543.window.WIDTH,
            height: $be9b019dcf88b1d2$export$d36076abcf594543.window.HEIGHT,
            visible: true
        });
        $be9b019dcf88b1d2$export$d36076abcf594543.window.addEvent(()=>{
            $be9b019dcf88b1d2$export$d36076abcf594543.UI.setSize($be9b019dcf88b1d2$export$d36076abcf594543.window.WIDTH, $be9b019dcf88b1d2$export$d36076abcf594543.window.HEIGHT);
            this.background.width = $be9b019dcf88b1d2$export$d36076abcf594543.window.WIDTH;
            this.background.height = $be9b019dcf88b1d2$export$d36076abcf594543.window.HEIGHT;
        });
        (0, $6e1d1d3cd91f3210$export$2e2bcd8739ae039)();
        (0, $eb2672c705c386be$export$2e2bcd8739ae039).initialize();
        (0, $ec5426ac07e1e730$export$2e2bcd8739ae039).initialize();
        this.time = new (0, $bcca9c904f06c83e$export$2e2bcd8739ae039)(config?.maxFPS ?? 60);
        $be9b019dcf88b1d2$export$d36076abcf594543.state = (0, $a7f36dda3f4a8094$export$2e2bcd8739ae039).CLOSED;
        $be9b019dcf88b1d2$export$d36076abcf594543.canvas = document.querySelector("#game");
        $be9b019dcf88b1d2$export$d36076abcf594543.ctx = $be9b019dcf88b1d2$export$d36076abcf594543.canvas.getContext("2d");
    }
    // métodos de incialização
    start() {
        $be9b019dcf88b1d2$export$d36076abcf594543.ReferenceGame = this;
        const main = this.scenes.get("main");
        if (main) main();
        else {
            console.error("Error the main scene not found!");
            $be9b019dcf88b1d2$export$d36076abcf594543.falied();
            return;
        }
        (0, $6a34e6f6a90b2c9f$export$2e2bcd8739ae039)();
        $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects.forEach((g)=>g.start());
    }
    update() {
        $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects.forEach((g)=>g.gameUpdate());
        $be9b019dcf88b1d2$export$d36076abcf594543.UI.FrameUpdate();
    }
    render() {
        $be9b019dcf88b1d2$export$d36076abcf594543.ctx.clearRect(0, 0, $be9b019dcf88b1d2$export$d36076abcf594543.window.WIDTH, $be9b019dcf88b1d2$export$d36076abcf594543.window.HEIGHT);
        this.background.render();
        $be9b019dcf88b1d2$export$d36076abcf594543.ctx.beginPath();
        $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects.forEach((g)=>{
            g.render();
        });
        $be9b019dcf88b1d2$export$d36076abcf594543.ctx.closePath();
        $be9b019dcf88b1d2$export$d36076abcf594543.UI.FrameRender();
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
    // métodos de controle
    static loader(...assets) {
        let names = [];
        assets.forEach((a)=>{
            const name = a.split("/");
            names.push(name[name.length - 1]);
            if (!this.ASSETS.get(name[name.length - 1])) {
                if (/\.(mp3|wav|flac|ogg)$/i.test(a)) new (0, $53e27565d1108d13$export$2e2bcd8739ae039)(a);
                else if (/\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(a)) new (0, $157157e820ac0459$export$2e2bcd8739ae039)(a);
            }
        });
        return names;
    }
    addScene(scene, performer) {
        if (!this.scenes.get(scene)) {
            this.scenes.set(scene, performer);
            return;
        }
        console.error("Scene overwriting is not allowed!");
        $be9b019dcf88b1d2$export$d36076abcf594543.falied();
    }
    changeScene(scene) {
        const sc = this.scenes.get(scene);
        if (sc) {
            $be9b019dcf88b1d2$export$d36076abcf594543.UI.setChildrens([]);
            $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects = [];
            sc();
            $be9b019dcf88b1d2$export$d36076abcf594543.GameObjects.forEach((g)=>g.start());
            return;
        }
        console.warn(`The scene ${scene} was not found`);
    }
}
var $be9b019dcf88b1d2$export$2e2bcd8739ae039 = $be9b019dcf88b1d2$export$d36076abcf594543;


//# sourceMappingURL=GamaSource.js.map
