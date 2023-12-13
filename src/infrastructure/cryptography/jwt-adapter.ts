import { Encrypter, Decrypter } from '@data/protocols';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) {}

    async encrypt(plainText: string): Promise<string> {
        return jwt.sign({ id: plainText }, this.secret);
    }

    async decrypt(cipherText: string): Promise<string> {
        return jwt.verify(cipherText, this.secret) as string;
    }
}
