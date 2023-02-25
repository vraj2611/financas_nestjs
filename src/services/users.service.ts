import { Injectable, BadRequestException } from '@nestjs/common';
import { IUser, User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { UserRepository } from 'src/repositories/users.repository';
import { UpdateUserDto } from 'src/dtos/updateUserDto';

@Injectable()
export class UsersService {

    constructor(
        private repo: UserRepository
    ) { }

    async createUser(dto: CreateUserDto): Promise<User> {

        const user = await this.getByEmail(dto.email);
        if (user) throw new BadRequestException("email already exists");

        dto.created_at = Date.now();
        const res = await this.repo.create(dto);
        return res;
    }

    async get(id: string): Promise<User> {
        return this.repo.get(id);
    }

    async getByEmail(email: string): Promise<IUser> {
        return this.repo.getBy('email', email);
    }

    async updateUser(dto: UpdateUserDto) {
        return this.repo.update(dto);
    }

    async listUsers(): Promise<any[]> {
        const users = await this.repo.listAll();
        return users.map(u => {
            return {
                "name": u.name,
                "email": u.email,
                "id": u.id
            }
        });
    }

    async deleteUser(id: string) {
        const user:User = await this.get(id);
        user.anonymize();
        return this.repo.update(user);
    }

}
