import { Injectable, BadRequestException } from '@nestjs/common';
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
        this.validatePasswordStrength(password);
        return argon2.hash(password);
    }

    validatePasswordStrength(password: string){
        console.log({password});
        if (password.length < 8) throw new BadRequestException("Password should has at least 8 characters")
        if (!/[a-z]/.test(password)) throw new BadRequestException("Password should has some lowercase character")
        if (!/[A-Z]/.test(password)) throw new BadRequestException("Password should has some uppercase character")
        if (!/[0-9]/.test(password)) throw new BadRequestException("Password should has some number character")
        if (!/\W/.test(password)) throw new BadRequestException("Password should has some special character")
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
            obj[key] = await this.encrypt(obj[key]);
        }
        return obj;
    }

    async decrypt_object<T>(obj: T, fields: string[]): Promise<T> {
        for (const key of fields) {
            obj[key] = await this.decrypt(obj[key]);
        }
        return obj;
    }

    async encrypt(plain_text: string): Promise<string> {
        const cipher = createCipheriv('aes-256-ctr', this.key, this.iv);
        return Buffer.concat([
            cipher.update(plain_text),
            cipher.final(),
        ]).toString('base64');
    }

    async decrypt(encrypted_text: string): Promise<string> {
        const decipher = createDecipheriv('aes-256-ctr', this.key, this.iv);
        return Buffer.concat([
            decipher.update(encrypted_text, 'base64'),
            decipher.final(),
        ]).toString();
    }

}
