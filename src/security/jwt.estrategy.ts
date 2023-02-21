import { ExtractJwt,  Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

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
