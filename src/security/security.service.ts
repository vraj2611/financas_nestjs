import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2";
import { createCipheriv, randomBytes, scrypt, createDecipheriv, Cipher, Decipher, scryptSync } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class SecurityService {

    private cipher: Cipher;
    private decipher: Decipher;

    constructor(
        private jwtService: JwtService,
    ) {
       // this.bootstrapCrypto();
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
        // for (const key of fields) {
        //     obj[key] = await this.encrypt_text(obj[key]);
        // }
        return obj;
    }

    async decrypt_object<T>(obj: T, fields: string[]): Promise<T> {
        // for (const key of fields) {
        //     obj[key] = await this.decrypt_text(obj[key]);
        // }
        return obj;
    }

    private async bootstrapCrypto() {
        const iv = randomBytes(16);
        const key = (await promisify(scrypt)(process.env.JWT_SECRET, 'salt', 32)) as Buffer;
        this.cipher = createCipheriv('aes-256-ctr', key, iv);
        this.decipher = createDecipheriv('aes-256-ctr', key, iv);
    }

    async encrypt_text(plain_text: string): Promise<string> {
        const iv = randomBytes(16);
        const key = scryptSync(process.env.JWT_SECRET, 'salt', 32);
        const cipher = createCipheriv('aes-256-ctr', Buffer.from("ABC"), iv);
        const encrypted_text = Buffer.concat([
            cipher.update(plain_text, 'utf8'),
            cipher.final(),
        ]).toString('base64');

        return encrypted_text;
    }

    async decrypt_text(encrypted_text: string): Promise<string> {
        const iv = randomBytes(16);
        const key = scryptSync(process.env.JWT_SECRET, 'salt', 32);
        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        const plain_text = Buffer.concat([
            decipher.update(encrypted_text, 'base64'),
            decipher.final(),
        ]).toString('utf8');
        return plain_text;
    }
}
