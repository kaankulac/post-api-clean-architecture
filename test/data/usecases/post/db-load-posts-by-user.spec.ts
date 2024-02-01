import { DbLoadPostsByUser } from '@data/usecases';
import { LoadUserByIdRepositorySpy, LoadPostsByUserSpy } from '@test/data/mocks';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: DbLoadPostsByUser;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    loadPostsByUserRepositorySpy: LoadPostsByUserSpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const loadPostsByUserRepositorySpy = new LoadPostsByUserSpy();
    const sut = new DbLoadPostsByUser(loadPostsByUserRepositorySpy, loadUserByIdRepositorySpy);
    return {
        sut,
        loadUserByIdRepositorySpy,
        loadPostsByUserRepositorySpy
    };
};

let userId: string;

describe('DbLoadPostsByUser Usecase', () => {
    beforeEach(() => {
        userId = faker.string.uuid();
    });
    test('Should call LoadUserByIdRepository with correct values', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        await sut.load(userId);
        expect(loadUserByIdRepositorySpy.userId).toBe(userId);
    });

    test('Should call LoadPostsByUserRepository with correct values', async () => {
        const { sut, loadPostsByUserRepositorySpy } = makeSut();
        await sut.load(userId);
        expect(loadPostsByUserRepositorySpy.userId).toBe(userId);
    });

    test('Should return null if LoadUserByIdRepository returns null', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        loadUserByIdRepositorySpy.result = null;
        const result = await sut.load(userId);
        expect(result).toBeNull();
    });

    test('Should return empty array if LoadPostsByUser returns []', async () => {
        const { sut, loadPostsByUserRepositorySpy } = makeSut();
        loadPostsByUserRepositorySpy.result = [];
        const result = await sut.load(userId);
        expect(result).toEqual([]);
    });

    test('Should throw if LoadUserByIdRepository throws', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        jest.spyOn(loadUserByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.load(userId);
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LoadPostsByUserRepository throws', async () => {
        const { sut, loadPostsByUserRepositorySpy } = makeSut();
        jest.spyOn(loadPostsByUserRepositorySpy, 'loadByUser').mockImplementationOnce(throwError);
        const promise = sut.load(userId);
        await expect(promise).rejects.toThrow();
    });

    test('Should return posts on success', async () => {
        const { sut, loadPostsByUserRepositorySpy } = makeSut();
        const result = await sut.load(userId);
        expect(result).toEqual(loadPostsByUserRepositorySpy.result);
    });
});
