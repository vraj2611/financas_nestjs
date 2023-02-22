import { Injectable, BadRequestException } from '@nestjs/common';
import { IUser } from 'src/models/user.class';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { UserRepository } from 'src/repositories/users.repository';
import { RoleRepository } from 'src/repositories/roles.repository';
import { UpdateUserDto } from 'src/dtos/updateUserDto';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class UsersService {

    constructor(
        private repo: UserRepository,
        private rolerepo: RoleRepository
    ) { }

    async createUser(dto: CreateUserDto): Promise<IUser> {

        const user = await this.getByEmail(dto.email);
        if (user) throw new BadRequestException("email already exists");

        dto.created_at = Date.now();
        const res = await this.repo.create(dto);
        delete res.password;
        return res;
    }

    async get(id: string): Promise<any> {
        return this.repo.get(id);
    }

    async getByEmail(email: string): Promise<IUser> {
        return this.repo.getBy('email', email);
    }

    async updateUser(dto: UpdateUserDto) {
        return this.repo.update(dto);
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
        const user = await this.get(id);
        return this.repo.update(this.anonymizeUser(user));
    }

    private anonymizeUser(user: IUser){
        user.password = "****";
        user.name = "deleted_" + user.id;
        user.email = "****@" + user.email.split("@")[1]
        user.phone = user.phone.substring(0, user.phone.length - 6) + "******"
        user.creditcard = user.creditcard.substring(0, user.creditcard.length - 12) + "************"
        user.deleted_at = Date.now();
        return user;
    }

}
