import { ExtractJwt,  Strategy } from 'passport-jwt';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') { }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('authtoken'),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any) {
        return payload;
    }
    
}
