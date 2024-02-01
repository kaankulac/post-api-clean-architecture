import { BcryptAdapter } from '@infrastructure/cryptography';
import { throwError } from '@test/domain/mocks';

import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
    async hashSync(): Promise<string> {
        return 'hash';
    },

    async compareSync(): Promise<boolean> {
        return true;
    }
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
    describe('hash', () => {
        test('Should call hash with correct values', async () => {
            const sut = makeSut();
            const hashSpy = jest.spyOn(bcrypt, 'hashSync');
            await sut.hash('value');
            expect(hashSpy).toHaveBeenCalledWith('value', salt);
        });

        test('Should return a valid hash on success', async () => {
            const sut = makeSut();
            const hash = await sut.hash('value');
            expect(hash).toBe('hash');
        });

        test('Should throw if hash throws', async () => {
            const sut = makeSut();
            jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(throwError);
            const promise = sut.hash('value');
            await expect(promise).rejects.toThrow();
        });
    });

    describe('compare', () => {
        test('Should call compare with correct values', async () => {
            const sut = makeSut();
            const compareSpy = jest.spyOn(bcrypt, 'compareSync');
            await sut.compare('value', 'hash');
            expect(compareSpy).toHaveBeenCalledWith('value', 'hash');
        });

        test('Should return true when compare succeeds', async () => {
            const sut = makeSut();
            const isValid = await sut.compare('value', 'hash');
            expect(isValid).toBe(true);
        });

        test('Should return false when comapre fails', async () => {
            const sut = makeSut();
            jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => false);
            const isValid = await sut.compare('value', 'hash');
            expect(isValid).toBe(false);
        });

        test('Should throw if compare throws', async () => {
            const sut = makeSut();
            jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(throwError);
            const promise = sut.compare('value', 'hash');
            await expect(promise).rejects.toThrow();
        });
    });
});
