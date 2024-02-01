import { DbLoadCommentByPost } from '@data/usecases';
import { LoadCommentsByPostRepositorySpy, LoadPostByIdRepositorySpy } from '@test/data/mocks';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: DbLoadCommentByPost;
    loadPostByIdRepositorySpy: LoadPostByIdRepositorySpy;
    loadCommentsByPostRepositorySpy: LoadCommentsByPostRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadPostByIdRepositorySpy = new LoadPostByIdRepositorySpy();
    const loadCommentsByPostRepositorySpy = new LoadCommentsByPostRepositorySpy();
    const sut = new DbLoadCommentByPost(loadCommentsByPostRepositorySpy, loadPostByIdRepositorySpy);
    return {
        sut,
        loadPostByIdRepositorySpy,
        loadCommentsByPostRepositorySpy
    };
};

let postId: string;

describe('DbLoadCommentsByPost Usecase', () => {
    beforeEach(() => {
        postId = faker.string.uuid();
    });
    test('Should call LoadPostByIdRepository with correct values', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        await sut.load(postId);
        expect(loadPostByIdRepositorySpy.postId).toBe(postId);
    });

    test('Should call LoadCommentsByPostRepository with correct values', async () => {
        const { sut, loadCommentsByPostRepositorySpy } = makeSut();
        await sut.load(postId);
        expect(loadCommentsByPostRepositorySpy.id).toBe(postId);
    });

    test('Should return null if LoadPostById returns null', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        loadPostByIdRepositorySpy.result = null;
        const result = await sut.load(postId);
        expect(result).toBeNull();
    });

    test('Should return empty array if LoadCommentsByPostRepository returns []', async () => {
        const { sut, loadCommentsByPostRepositorySpy } = makeSut();
        loadCommentsByPostRepositorySpy.result = [];
        const result = await sut.load(postId);
        expect(result).toEqual([]);
    });

    test('Should throw if LoadPostByIdRepository throws', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        jest.spyOn(loadPostByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.load(postId);
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LoadCommentsByPostRepository throws', async () => {
        const { sut, loadCommentsByPostRepositorySpy } = makeSut();
        jest.spyOn(loadCommentsByPostRepositorySpy, 'loadByPost').mockImplementationOnce(throwError);
        const promise = sut.load(postId);
        await expect(promise).rejects.toThrow();
    });

    test('Should return comments on success', async () => {
        const { sut, loadCommentsByPostRepositorySpy } = makeSut();
        const result = await sut.load(postId);
        expect(result).toEqual(loadCommentsByPostRepositorySpy.result);
    });
});
