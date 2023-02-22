export interface ICategory {
    id?: string;
    name: string;
    description: string;
}

export class Category {
    id?: string;
    name: string;
    description: string;

    constructor(info:ICategory){
        for (const k in info) this[k] = info[k]
    }

}