export interface IUser {
    email:string;
    name:string;
    password?:string;
    id?:string;    
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
    id:string;

    
    constructor(info:IUser){
        for (const k in info) this[k] = info[k]
    }
}