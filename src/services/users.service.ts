import { Injectable } from '@nestjs/common';
import { IUser } from 'src/models/user.class';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { UserRepository } from 'src/repositories/users.repository';

@Injectable()
export class UsersService {
    
    constructor(private repo: UserRepository) {}

    async createUser(dto: CreateUserDto): Promise<IUser> {

        const user = await this.getUser(dto.email);
        if (user) throw "email already exists";

        this.repo.save({
            name: dto.name,
            password: dto.password,
            email: dto.email,
            created_at: Date.now()

        });
        return this.getUser(dto.email);
    }

    async getUser(email: string): Promise<IUser> {
        return this.repo.getBy('email', email);
    }

    async listUsers(): Promise<IUser[]> {
        return this.repo.listAll();
    }

    async deleteUser(email: string) {
        const user = await this.getUser(email);
        await this.repo.getDatastore().delete(user[this.repo.getDatastore().KEY])
    }
}
