import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto';

@Injectable()
export class SecurityService {

    private key: Buffer;
    private iv: Buffer;

    constructor(
        private jwtService: JwtService,
    ) {
        this.iv = Buffer.from(process.env.JWT_SECRET).slice(0, 16);
        this.key = scryptSync(process.env.JWT_SECRET, 'salt', 32);
    }


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

    async encrypt_object<T>(obj: T, fields: string[]): Promise<T> {
        for (const key of fields) {
            obj[key] = await this.encrypt_text(obj[key]);
        }
        return obj;
    }

    async decrypt_object<T>(obj: T, fields: string[]): Promise<T> {
        for (const key of fields) {
            obj[key] = await this.decrypt_text(obj[key]);
        }
        return obj;
    }

    async encrypt_text(plain_text: string): Promise<string> {
        const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);
        return Buffer.concat([
            cipher.update(plain_text),
            cipher.final(),
        ]).toString('base64');
    }

    async decrypt_text(encrypted_text: string): Promise<string> {
        const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
        return Buffer.concat([
            decipher.update(encrypted_text, 'base64'),
            decipher.final(),
        ]).toString();
    }

}
