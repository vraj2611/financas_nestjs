import { Strategy } from 'passport-local';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SecurityService } from './security.service';
import { UsersService } from 'src/services/users.service';
import { IUser } from 'src/models/user.class';

@Injectable()
export class LocalGuard extends AuthGuard('local') {}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private sserv: SecurityService, private userv: UsersService) {
        super({ usernameField: 'email' })
    }

    async validate(username: string, password: string): Promise<any> {

        const user: IUser = await this.userv.getUser(username);
        if (!await this.sserv.verifyPassword(user.password, password)) {
            throw new UnauthorizedException("email or password incorrect.")
        }
        return user;
    }
}