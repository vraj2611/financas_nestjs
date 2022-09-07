import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
import * as argon2 from "argon2";

export interface IUSer {
    email: string,
    password?: string,
    created_at?: Date,
    name?: string
}

@Injectable()
export class UsersService {

    private ds: Datastore;

    constructor() {
        this.ds = new Datastore();
    }

    async addUser(email: string, password: string, name: string): Promise<string> {
        const dskey = this.ds.key("User")
        await this.ds.save({
            key: dskey
            , data: {
                name: name,
                password: await argon2.hash(password),
                email: email,
                created_at: Date.now()
            }
        });
        return name

    }

    async getLoggingUser(email: string, password: string) {
        console.log("sdadsadasdads")
        return "user"
    }

    async listUsers() {
        const query = this.ds.createQuery('User')
        const [users] = await this.ds.runQuery(query);
        console.log(users);
        return users
    }
}
