import GameObject from "../gameObject/GameObject";
import MemoryManeger from "./MemoryManeger";

export default class DataSave<T extends GameObject> {

    private storageKey: string

    constructor(storageKey:string) {

        this.storageKey = storageKey

    }

    public save(item: T): void {

        const items = this.getAll();
        items.push(item);
        localStorage.setItem(this.storageKey, MemoryManeger.toJSON(items));

    }

    public getAll(): T[] {

        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];

    }

    public getById(tag: string): T | undefined {
    
        const items = this.getAll();
        return items.find(item => item.tag === tag);
    
    }

    public update(item: T): void {
    
        const items = this.getAll();
        const index = items.findIndex(existingItem => existingItem.tag === item.tag);

        if (index !== -1) {
            items[index] = item;
            localStorage.setItem(this.storageKey, MemoryManeger.toJSON(items));
        }
    
    }

    public delete(tag: string): void {
    
        const items = this.getAll();
        const filteredItems = items.filter(item => item.tag !== tag);
        localStorage.setItem(this.storageKey, MemoryManeger.toJSON(filteredItems));
    
    }

    public clear(): void {
        
        localStorage.removeItem(this.storageKey);

    }
}
