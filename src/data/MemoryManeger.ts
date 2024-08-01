export default abstract class MemoryManeger {

    private static getCircularReplacer() {
        const seen = new WeakSet();
        return (key: string, value: any) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return; 
            }
            seen.add(value);
          }
          return value;
        };
    }

    public static toJSON(obj:any) {

        return JSON.stringify(obj, this.getCircularReplacer())

    }

}