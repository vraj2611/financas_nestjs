import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";
import { User, IUser } from 'src/models/user.class';
import { CreateUserDto } from 'src/dtos/createUserDto.class';

@Injectable()
export class SecurityService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async createUser(dto : CreateUserDto){
        dto.password = await argon2.hash(dto.password);
        return this.usersService.createUser(dto);   
    }

    async loginUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(email);
        if (!await argon2.verify(user.password, password)) throw new Error("email e/ou senha incorretos");
        return {
            access_token: this.jwtService.sign({"user": email}),
        };
    }

}
