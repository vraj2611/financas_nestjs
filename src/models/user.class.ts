export interface IUser {
    email:string;
    name:string;
    password?:string;
    id?:number;    
    creditcard:string;
    phone:string;
    roles?:any[];
    created_at?:number;
    deleted_at?:number;
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