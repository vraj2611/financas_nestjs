import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class SecurityService {

    constructor(
        private jwtService: JwtService,
    ) { }

    hashPassword(password: string) {
        return argon2.hash(password);
    }

    verifyPassword(hash: string, plain: string) {
        return argon2.verify(hash, plain);
    }

    createJwt(payload: string | object) {
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h'
        })
        return { "authtoken": token };
    }

    async encrypt(plain_text: string): Promise<string> {
        const iv = randomBytes(16);
        const password = 'Password used to generate key';
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const encrypted_text = Buffer.concat([
            cipher.update(plain_text),
            cipher.final(),
        ]).toString();

        return encrypted_text;
    }

    async decrypt(encrypted_text: string): Promise<string> {
        const iv = randomBytes(16);
        const password = 'Password used to generate key';
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        
        const plain_text = Buffer.concat([
            decipher.update(Buffer.from(encrypted_text)),
            decipher.final(),
        ]).toString();
        return plain_text;;
    }

}
