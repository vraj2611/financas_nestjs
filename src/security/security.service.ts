import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";

@Injectable()
export class SecurityService {

    constructor(
        private jwtService: JwtService,
    ) { }

    hashPassword(password:string){
        return argon2.hash(password);
    }

    verifyPassword(hash:string, plain:string){
        return argon2.verify(hash, plain);
    }
    
    createJwt(payload: string | object){
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h'
        })
        return {"authtoken": token}; 
    }

    extractJwt(token:string){
        return {
            payload: this.jwtService.decode(token),
            verify: this.verify(token)
        }
    }

    verify(token:string){
        return this.jwtService.verify(token,{
            ignoreExpiration: true,
            secret: process.env.JWT_SECRET
        })
    }

}
