import { DbDeletePost } from '@data/usecases';
import { DeletePostRepositorySpy, LoadPostByIdRepositorySpy } from '@test/data/mocks';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: DbDeletePost;
    deletePostRepositorySpy: DeletePostRepositorySpy;
    loadPostByIdRepositorySpy: LoadPostByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
    const deletePostRepositorySpy = new DeletePostRepositorySpy();
    const loadPostByIdRepositorySpy = new LoadPostByIdRepositorySpy();
    const sut = new DbDeletePost(deletePostRepositorySpy, loadPostByIdRepositorySpy);
    return {
        sut,
        deletePostRepositorySpy,
        loadPostByIdRepositorySpy
    };
};

let postId: string;

describe('DbDeletePost Usecase', () => {
    beforeEach(() => {
        postId = faker.string.uuid();
    });
    test('Should call DeletePostRepository with correct values', async () => {
        const { sut, deletePostRepositorySpy } = makeSut();
        await sut.delete(postId);
        expect(deletePostRepositorySpy.postId).toBe(postId);
    });

    test('Should call LoadPostByIdRepository with correct values', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        await sut.delete(postId);
        expect(loadPostByIdRepositorySpy.postId).toBe(postId);
    });

    test('Should return false if DeletePostRepository return false', async () => {
        const { sut, deletePostRepositorySpy } = makeSut();
        deletePostRepositorySpy.result = false;
        const result = await sut.delete(postId);
        expect(result).toBe(false);
    });

    test('Should return false if LoadPostByIdRepository returns null', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        loadPostByIdRepositorySpy.result = null;
        const result = await sut.delete(postId);
        expect(result).toBe(false);
    });

    test('Should throw if DeletePostRepository throws', async () => {
        const { sut, deletePostRepositorySpy } = makeSut();
        jest.spyOn(deletePostRepositorySpy, 'delete').mockImplementationOnce(throwError);
        const promise = sut.delete(postId);
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LoadPostByIdRepository throws', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        jest.spyOn(loadPostByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.delete(postId);
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.delete(postId);
        expect(result).toBe(true);
    });
});
