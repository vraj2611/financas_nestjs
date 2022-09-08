import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
import * as argon2 from "argon2";
import { EntityObject, Entities, entity } from '@google-cloud/datastore/build/src/entity';

export interface IUser {
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

        this.ds.save({
            key: this.ds.key("User"),
            excludefromIndexes: [
                'name', 'password'
            ],
            data: {
                name: name,
                password: await argon2.hash(password),
                email: email,
                created_at: Date.now()
            }
        });
        return name
    }

    async getUser(email: string): Promise<IUser> {
        const query = this.ds.createQuery('User').filter('email', email)
        const [result] = await this.ds.runQuery(query);
        if (result.length = 0) return null; 
        const user: IUser = result[0];
        return user;
    }

    async logUser(email: string, password: string): Promise<IUser> {
        const user = await this.getUser(email);
        if (!await argon2.verify(user.password, password)) return null
        return user;
    }

    async listUsers() {
        const query = this.ds.createQuery('User')
        const [users] = await this.ds.runQuery(query);
        console.log(users);
        return users
    }
}
