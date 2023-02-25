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

    anonymize() {
        this.name = "anonymous_" + this.id;
        this.email = "****@" + this.email.split("@")[1]
        this.password = "****";
        this.phone = this.phone.substring(0, this.phone.length - 6) + "******"
        this.creditcard = this.creditcard.substring(0, this.creditcard.length - 12) + "************"
    }
}