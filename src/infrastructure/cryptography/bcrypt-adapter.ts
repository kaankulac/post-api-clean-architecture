import { Hasher, HashComparer } from '@data/protocols';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher, HashComparer {
    constructor(private readonly salt: number) {}

    async hash(plainText: string): Promise<string> {
        return bcrypt.hashSync(plainText, this.salt);
    }

    async compare(plainText: string, cipherText: string): Promise<boolean> {
        return bcrypt.compareSync(plainText, cipherText);
    }
}
