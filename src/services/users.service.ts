import { Injectable, BadRequestException } from '@nestjs/common';
import { IUser } from 'src/models/user.class';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { UserRepository } from 'src/repositories/users.repository';
import { RoleRepository } from 'src/repositories/roles.repository';

@Injectable()
export class UsersService {
    
    constructor(
        private repo: UserRepository,
        private rolerepo: RoleRepository) {}

    async createUser(dto: CreateUserDto): Promise<IUser> {

        const user = await this.getUser(dto.email);
        if (user) throw new BadRequestException("email already exists");

        dto.created_at = Date.now();
        this.repo.save(dto);
        return this.getUser(dto.email);
    }

    async getUser(email: string): Promise<IUser> {
        return this.repo.getBy('email', email);
    }

    async getUserRoles(email: string){
        const user = await this.getUser(email);
        user.roles = await this.rolerepo.listBy('user', email);
    }

    async listUsers(): Promise<IUser[]> {
        return this.repo.listAll();
    }

    async deleteUser(email: string) {
        const user = await this.getUser(email);
        await this.repo.getDatastore().delete(user[this.repo.getDatastore().KEY])
    }
}
