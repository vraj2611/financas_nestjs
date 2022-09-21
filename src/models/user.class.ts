export interface IUser {
    email:string;
    name:string;
    password?:string;
    id?:number;    
}

export class User {
    email:string;
    name:string;
    password:string;
    id:number;

    constructor(info:IUser){
        for (const k in info) this[k] = info[k]
    }
}