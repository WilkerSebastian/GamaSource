export default class JsonAnimation {

    public animations: [{
        
        name:string,
        slices:[{x:number,y:number,width:number,height:number}],
        source:string
    
    }];

    constructor(json:any) {
        
        this.animations = json.animations
        

    }

}