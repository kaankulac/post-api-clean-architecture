import { Hasher, HashComparer, Encrypter, Decrypter } from '@data/protocols';

import { faker } from '@faker-js/faker';

export class HasherSpy implements Hasher {
    digest = faker.string.uuid();
    plainText: string;

    async hash(plainText: string): Promise<string> {
        this.plainText = plainText;
        return this.digest;
    }
}

export class HashComparerSpy implements HashComparer {
    plainText: string;
    digest: string;
    isValid = true;

    async compare(plaintText: string, digest: string): Promise<boolean> {
        this.plainText = plaintText;
        this.digest = digest;
        return this.isValid;
    }
}

export class EncrypterSpy implements Encrypter {
    cipherText = faker.string.uuid();
    plainText: string;

    async encrypt(plaintText: string): Promise<string> {
        this.plainText = plaintText;
        return this.cipherText;
    }
}

export class DecrypterSpy implements Decrypter {
    plainText = faker.internet.password.toString();
    cipherText: string;

    async decrypt(cipherText: string): Promise<string> {
        this.cipherText = cipherText;
        return this.plainText;
    }
}
