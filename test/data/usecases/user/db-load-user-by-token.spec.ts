import { DbLoadUserByToken } from '@data/usecases';
import { LoadUserByTokenRepositorySpy, DecrypterSpy } from '@test/data/mocks';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: DbLoadUserByToken;
    decrypterSpy: DecrypterSpy;
    loadUserByTokenSpy: LoadUserByTokenRepositorySpy;
};

const makeSut = (): SutTypes => {
    const decrypterSpy = new DecrypterSpy();
    const loadUserByTokenSpy = new LoadUserByTokenRepositorySpy();
    const sut = new DbLoadUserByToken(loadUserByTokenSpy, decrypterSpy);
    return {
        sut,
        decrypterSpy,
        loadUserByTokenSpy
    };
};

let token: string;

describe('DbLoadUserByToken Usecase', () => {
    beforeEach(() => {
        token = faker.string.uuid();
    });

    test('Should call Decrypter with correct cipherText', async () => {
        const { sut, decrypterSpy } = makeSut();
        await sut.load(token);
        expect(decrypterSpy.cipherText).toBe(token);
    });

    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterSpy } = makeSut();
        decrypterSpy.plainText = null;
        const account = await sut.load(token);
        expect(account).toBeNull();
    });

    test('Should call LoadUserByTokenRepository with correct values', async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        await sut.load(token);
        expect(loadUserByTokenSpy.params).toBe(token);
    });

    test('Should return null if LoadUserByTokenReturns null', async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        loadUserByTokenSpy.result = null;
        const account = await sut.load(token);
        expect(account).toBeNull();
    });

    test('Should return an user on success', async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        const account = await sut.load(token);
        expect(account).toEqual(loadUserByTokenSpy.result);
    });

    test('Should return null if Decrypter throws', async () => {
        const { sut, decrypterSpy } = makeSut();
        jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);
        const account = await sut.load(token);
        expect(account).toBeNull();
    });

    test('Should throw if LoadUserByToken throws', async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        jest.spyOn(loadUserByTokenSpy, 'loadByToken').mockImplementationOnce(throwError);
        const promise = sut.load(token);
        await expect(promise).rejects.toThrow();
    });
});
