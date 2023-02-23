import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { Reflector } from '@nestjs/core';
import { isPublicRoute } from './public.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private serv: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authtoken'),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    validate(payload: any) {
        return this.serv.get(payload.id);
    }

}
