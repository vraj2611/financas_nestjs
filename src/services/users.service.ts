import { Injectable, BadRequestException, ConsoleLogger } from '@nestjs/common';
import { IUser } from 'src/models/user.class';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { UserRepository } from 'src/repositories/users.repository';
import { RoleRepository } from 'src/repositories/roles.repository';
import { UpdateUserDto } from 'src/dtos/updateUserDto';

@Injectable()
export class UsersService {

    constructor(
        private repo: UserRepository,
        private rolerepo: RoleRepository) { }

    async createUser(dto: CreateUserDto): Promise<IUser> {

        const user = await this.getByEmail(dto.email);
        if (user) throw new BadRequestException("email already exists");

        dto.created_at = Date.now();
        const res = await this.repo.save(dto);
        console.log(res);
        return;
    }

    async get(id: string): Promise<any> {
        return this.repo.get(id);
    }

    async getByEmail(email: string): Promise<IUser> {
        return this.repo.getBy('email', email);
    }

    async updateUser(dto: UpdateUserDto) {
        return this.repo.update(dto.id, dto);
    }

    async getUserRoles(email: string) {
        const user = await this.getByEmail(email);
        user.roles = await this.rolerepo.listBy('user', email);
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
        //this.repo.delete(id)
        const user = await this.get(id);
        user.name = "Deleted";
        this.updateUser(user);
    }

}
