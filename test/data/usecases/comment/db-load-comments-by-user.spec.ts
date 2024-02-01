import { DbLoadCommentsByUser } from '@data/usecases';
import { LoadCommentsByUserRepositorySpy, LoadUserByIdRepositorySpy } from '@test/data/mocks';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: DbLoadCommentsByUser;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    loadCommentsByUserRepositorySpy: LoadCommentsByUserRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const loadCommentsByUserRepositorySpy = new LoadCommentsByUserRepositorySpy();
    const sut = new DbLoadCommentsByUser(loadCommentsByUserRepositorySpy, loadUserByIdRepositorySpy);
    return {
        sut,
        loadUserByIdRepositorySpy,
        loadCommentsByUserRepositorySpy
    };
};

let userId: string;

describe('DbLoadCommentsByUser Usecase', () => {
    beforeEach(() => {
        userId = faker.string.uuid();
    });
    test('Should call LoadUserByIdRepository with correct values', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        await sut.load(userId);
        expect(loadUserByIdRepositorySpy.userId).toBe(userId);
    });

    test('Should call LoadCommentsByUserRepository with correct values', async () => {
        const { sut, loadCommentsByUserRepositorySpy } = makeSut();
        await sut.load(userId);
        expect(loadCommentsByUserRepositorySpy.id).toBe(userId);
    });

    test('Should return null if LoadUserByIdRepository returns null', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        loadUserByIdRepositorySpy.result = null;
        const result = await sut.load(userId);
        expect(result).toBeNull();
    });

    test('Should return empty array if LoadCommentsByUserRepository returns []', async () => {
        const { sut, loadCommentsByUserRepositorySpy } = makeSut();
        loadCommentsByUserRepositorySpy.result = [];
        const result = await sut.load(userId);
        expect(result).toEqual([]);
    });

    test('Should throw if LoadUserByIdRepository throws', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        jest.spyOn(loadUserByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.load(userId);
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LoadCommentsByUserRepository throws', async () => {
        const { sut, loadCommentsByUserRepositorySpy } = makeSut();
        jest.spyOn(loadCommentsByUserRepositorySpy, 'loadByUser').mockImplementationOnce(throwError);
        const promise = sut.load(userId);
        await expect(promise).rejects.toThrow();
    });

    test('Should return comments on success', async () => {
        const { sut, loadCommentsByUserRepositorySpy } = makeSut();
        const result = await sut.load(userId);
        expect(result).toEqual(loadCommentsByUserRepositorySpy.result);
    });
});
