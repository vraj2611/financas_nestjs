import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SecurityService } from './security.service';
import { UsersService } from 'src/services/users.service';
import { IUser } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor(private sserv: SecurityService, private userv: UsersService) {
        super({ usernameField: 'email' })
    }

    async validate(username: string, password: string): Promise<any> {

        const user: IUser = await this.userv.getByEmail(username);
        if (!await this.sserv.verifyPassword(user.password, password)) {
            throw new UnauthorizedException("email or password incorrect.")
        }
        return user;
    }
}