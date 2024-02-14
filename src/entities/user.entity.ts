export interface IUser {
    email: string;
    name: string;
    password?: string;
    id?: string;
    creditcard: string;
    phone: string;
    roles?: any[];
    created_at?: number;
    deleted_at?: number;
}

export class User {
    email: string;
    name: string;
    password: string;
    creditcard: string;
    phone: string;
    id: string;
    credentials: Credential[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

}