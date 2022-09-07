import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];
    private ds: Datastore;
    constructor() {
        this.ds = new Datastore();
        this.ds.save({
            key: this.ds.key("User")
            , data: {
                username: 'john',
                password: 'changeme',
            }
        });
    }


    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
