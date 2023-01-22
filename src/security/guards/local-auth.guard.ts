import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SecurityService } from '../security.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: SecurityService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        return true;
        // const user = await this.authService.validateUser(username, password);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        // return user;
    }
}