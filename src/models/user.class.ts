export interface IUser {
    email:string;
    name:string;
    password?:string;
    id?:number;    
    creditcard:string;
    phone:string;
    roles?:any[];
}

export class User {
    email:string;
    name:string;
    password:string;
    creditcard:string;
    phone:string;
    id:number;

    constructor(info:IUser){
        for (const k in info) this[k] = info[k]
    }
}