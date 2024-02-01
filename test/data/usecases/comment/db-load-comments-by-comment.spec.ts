import { DbLoadCommentsByComment } from '@data/usecases';
import { LoadCommentsByCommentRepositorySpy, LoadCommentByIdRepositorySpy } from '@test/data/mocks';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: DbLoadCommentsByComment;
    loadCommentByIdRepositorySpy: LoadCommentByIdRepositorySpy;
    loadCommentsByCommentRepositorySpy: LoadCommentsByCommentRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadCommentByIdRepositorySpy = new LoadCommentByIdRepositorySpy();
    const loadCommentsByCommentRepositorySpy = new LoadCommentsByCommentRepositorySpy();
    const sut = new DbLoadCommentsByComment(loadCommentsByCommentRepositorySpy, loadCommentByIdRepositorySpy);
    return {
        sut,
        loadCommentByIdRepositorySpy,
        loadCommentsByCommentRepositorySpy
    };
};

let commentId: string;

describe('DbLoadCommentsByComment Usecase', () => {
    beforeEach(() => {
        commentId = faker.string.uuid();
    });
    test('Should call LoadCommentByIdRepository with correct values', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        await sut.load(commentId);
        expect(loadCommentByIdRepositorySpy.id).toBe(commentId);
    });

    test('Should call LoadCommentsByCommentRepository with correct values', async () => {
        const { sut, loadCommentsByCommentRepositorySpy } = makeSut();
        await sut.load(commentId);
        expect(loadCommentsByCommentRepositorySpy.id).toBe(commentId);
    });

    test('Should return null if LoadCommentByIdRepository returns null', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        loadCommentByIdRepositorySpy.result = null;
        const result = await sut.load(commentId);
        expect(result).toBeNull();
    });

    test('Should return empty array if LoadCommentsByCommentRepository returns []', async () => {
        const { sut, loadCommentsByCommentRepositorySpy } = makeSut();
        loadCommentsByCommentRepositorySpy.result = [];
        const result = await sut.load(commentId);
        expect(result).toEqual([]);
    });

    test('Should throw if LoadCommentByIdRepository throws', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        jest.spyOn(loadCommentByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.load(commentId);
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LoadCommentsByCommentRepository throws', async () => {
        const { sut, loadCommentsByCommentRepositorySpy } = makeSut();
        jest.spyOn(loadCommentsByCommentRepositorySpy, 'loadByComment').mockImplementationOnce(throwError);
        const promise = sut.load(commentId);
        await expect(promise).rejects.toThrow();
    });

    test('Should return comments on success', async () => {
        const { sut, loadCommentsByCommentRepositorySpy } = makeSut();
        const result = await sut.load(commentId);
        expect(result).toEqual(loadCommentsByCommentRepositorySpy.result);
    });
});
