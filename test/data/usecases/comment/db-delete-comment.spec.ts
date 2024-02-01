import { DbDeleteComment } from '@data/usecases';
import { LoadCommentByIdRepositorySpy, DeleteCommentRepositorySpy } from '@test/data/mocks';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: DbDeleteComment;
    loadCommentByIdRepositorySpy: LoadCommentByIdRepositorySpy;
    deleteCommentRepositorySpy: DeleteCommentRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadCommentByIdRepositorySpy = new LoadCommentByIdRepositorySpy();
    const deleteCommentRepositorySpy = new DeleteCommentRepositorySpy();
    const sut = new DbDeleteComment(deleteCommentRepositorySpy, loadCommentByIdRepositorySpy);
    return {
        sut,
        loadCommentByIdRepositorySpy,
        deleteCommentRepositorySpy
    };
};

let commentId: string;

describe('DbDeleteComment Usecase', () => {
    beforeEach(() => {
        commentId = faker.string.uuid();
    });

    test('Should call LoadCommentByIdRepository with correct values', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        await sut.delete(commentId);
        expect(loadCommentByIdRepositorySpy.id).toBe(commentId);
    });

    test('Should call DeleteCommentRepository with correct values', async () => {
        const { sut, deleteCommentRepositorySpy } = makeSut();
        await sut.delete(commentId);
        expect(deleteCommentRepositorySpy.commentId).toBe(commentId);
    });

    test('Should return false if LoadCommentByIdRepository returns null', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        loadCommentByIdRepositorySpy.result = null;
        const result = await sut.delete(commentId);
        expect(result).toBe(false);
    });

    test('Should return false if DeleteCommentRepository returns false', async () => {
        const { sut, deleteCommentRepositorySpy } = makeSut();
        deleteCommentRepositorySpy.result = false;
        const result = await sut.delete(commentId);
        expect(result).toBe(false);
    });

    test('Shoduld throw if LoadCommentByIdRepository throws', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        jest.spyOn(loadCommentByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.delete(commentId);
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if DeleteCommentRepository throws', async () => {
        const { sut, deleteCommentRepositorySpy } = makeSut();
        jest.spyOn(deleteCommentRepositorySpy, 'delete').mockImplementationOnce(throwError);
        const promise = sut.delete(commentId);
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.delete(commentId);
        expect(result).toBe(true);
    });
});
