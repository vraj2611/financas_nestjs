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
        return {"token": this.jwtService.sign(payload)};
    }

    extractJwt(token:string){
        return this.jwtService.decode(token);
    }

}
