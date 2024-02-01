import { JwtAdapter } from '@infrastructure/cryptography';
import { throwError } from '@test/domain/mocks';

import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return 'token';
    },

    async verify(): Promise<string> {
        return 'value';
    }
}));

const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret');
};

describe('Jwt Adapter', () => {
    describe('sign', () => {
        test('Should call sign with correct values', async () => {
            const sut = makeSut();
            const signSpy = jest.spyOn(jwt, 'sign');
            await sut.encrypt('id');
            expect(signSpy).toHaveBeenCalledWith({ id: 'id' }, 'secret');
        });

        test('Should return token on success', async () => {
            const sut = makeSut();
            const token = await sut.encrypt('id');
            expect(token).toBe('token');
        });

        test('Should throw if sign throws', async () => {
            const sut = makeSut();
            jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError);
            const promise = sut.encrypt('id');
            await expect(promise).rejects.toThrow();
        });
    });

    describe('verify', () => {
        test('Should call test with correct values', async () => {
            const sut = makeSut();
            const verifySpy = jest.spyOn(jwt, 'verify');
            await sut.decrypt('token');
            expect(verifySpy).toHaveBeenCalledWith('token', 'secret');
        });

        test('Should return value on success', async () => {
            const sut = makeSut();
            const result = await sut.decrypt('token');
            expect(result).toBe('value');
        });

        test('Should throw if verify throws', async () => {
            const sut = makeSut();
            jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError);
            const promise = sut.decrypt('token');
            await expect(promise).rejects.toThrow();
        });
    });
});
