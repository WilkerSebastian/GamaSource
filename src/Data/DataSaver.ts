export default class DataSaver{
    data: any;
    
        public constructor (data:any){
            this.data =  data;
        }

        public setItem(data:any){
            window.localStorage.setItem('deita', JSON.stringify(DataSaver))
        }

        public getItem(){
            window.localStorage.getItem('deita')
            JSON.parse('deita');
        }

        public clearItem(){
            window.localStorage.clear
        }
}