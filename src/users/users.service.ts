import { Injectable } from '@nestjs/common';
import { Datastore, Entity } from '@google-cloud/datastore';
import * as argon2 from "argon2";

@Injectable()
export class UsersService {

    private ds: Datastore;

    constructor() {
        this.ds = new Datastore();
    }

    async addUser(email: string, password: string, name: string): Promise<IUser> {

        const user = await this.getUser(email);
        if (user) throw "email ja cadastrado";
         
        const result = await this.ds.save({
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
        return this.getUser(email);
    }

    async getUser(email: string): Promise<IUser> {
        const query = this.ds.createQuery('User').filter('email', email)
        const [[user, ...others], extra] = await this.ds.runQuery(query)
        return user;
    }

    async loginUser(email: string, password: string): Promise<IUser> {
        const user = await this.getUser(email);
        if (!await argon2.verify(user.password, password)) return null
        return user;
    }

    async listUsers():Promise<IUser[]> {
        const query = this.ds.createQuery('User')
        const [users] = await this.ds.runQuery(query);
        return users
    }

    async deleteUser(email:string){
        const user = await this.getUser(email);
        await this.ds.delete(user[this.ds.KEY])
    }
}
