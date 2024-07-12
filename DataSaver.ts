export default class DataSaver{                
        public static setItem(name:string, data:any){
            console.log(data);
            localStorage.setItem(name, JSON.stringify(data))                        
        }

        public static getItem(name:string){
            
            const data = localStorage.getItem(name)
            console.log(data);
            
            if(data){
                return JSON.parse(name);
            }
            else{
                return null;
            }
        }

        public static clearItem(name:string){
            this.setItem(name, null)
        }

        public static clearAll(){
            localStorage.clear()
        }
}