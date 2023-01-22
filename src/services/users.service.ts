import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
import { IUser } from 'src/models/user.class';
import { CreateUserDto } from 'src/dtos/createUserDto.class';

@Injectable()
export class UsersService {

    private ds: Datastore;

    constructor() {
        this.ds = new Datastore();
    }

    async createUser(dto:CreateUserDto): Promise<IUser> {

        const user = await this.getUser(dto.email);
        if (user) throw "email ja cadastrado";
         
        const result = await this.ds.save({
            key: this.ds.key("User"),
            excludefromIndexes: [
                'name', 'password'
            ],
            data: {
                name: dto.name,
                password: dto.password,
                email: dto.email,
                created_at: Date.now()
            }
        });
        return this.getUser(dto.email);
    }

    async getUser(email: string): Promise<IUser> {
        const query = this.ds.createQuery('User').filter('email', email)
        const [[user, ...others], extra] = await this.ds.runQuery(query)
        return user;
    }

    async listUsers():Promise<IUser[]> {
        const query = this.ds.createQuery('User');
        const [users] = await this.ds.runQuery(query);
        return users
    }

    async deleteUser(email:string){
        const user = await this.getUser(email);
        await this.ds.delete(user[this.ds.KEY])
    }
}
