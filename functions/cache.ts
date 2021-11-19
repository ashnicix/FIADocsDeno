import { element } from "./types.ts"

class Cache {
    
    elements: element[] = [];
    #first = true;

    constructor(){
    }

    first():boolean {
        if (this.#first === true){
            this.#first = false;
            console.log('Skipping items on first start');
            return true;
        }
        return false;
    }

    hasElement(element: element):boolean {
        const val = this.elements.find((a) => { return a.url == element.url })
        if (val === undefined) {
            return false;
        }
        return true;
    }

    addElement(element: element): void{
        if (!this.hasElement(element)) {
            this.elements.push(element);
        }
    }

}

export default new Cache();
