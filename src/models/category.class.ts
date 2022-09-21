export interface ICategory {
    name: string;
    description: string;
}

export class Category {
    name: string;
    description: string;
    
    constructor(info:ICategory){
        for (const k in info) this[k] = info[k]
    }

}