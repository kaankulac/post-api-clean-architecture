import { DbCreateComment } from '@data/usecases';
import { CreateCommentRepositorySpy } from '@test/data/mocks';
import { mockCreateCommentParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbCreateComment;
    createCommentRepositorySpy: CreateCommentRepositorySpy;
};

const makeSut = (): SutTypes => {
    const createCommentRepositorySpy = new CreateCommentRepositorySpy();
    const sut = new DbCreateComment(createCommentRepositorySpy);
    return {
        sut,
        createCommentRepositorySpy
    };
};

describe('DbCreateComment Usecase', () => {
    test('Should call CreateCommentRepository with correct values', async () => {
        const { sut, createCommentRepositorySpy } = makeSut();
        const createCommentParams = mockCreateCommentParams();
        await sut.create(createCommentParams);
        expect(createCommentRepositorySpy.params).toEqual(createCommentParams);
    });

    test('Should return false if CreateCommentRepository returns false', async () => {
        const { sut, createCommentRepositorySpy } = makeSut();
        createCommentRepositorySpy.result = false;
        const result = await sut.create(mockCreateCommentParams());
        expect(result).toBe(false);
    });

    test('Should throw if CreateCommentRepository throws', async () => {
        const { sut, createCommentRepositorySpy } = makeSut();
        jest.spyOn(createCommentRepositorySpy, 'create').mockImplementationOnce(throwError);
        const promise = sut.create(mockCreateCommentParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.create(mockCreateCommentParams());
        expect(result).toBe(true);
    });
});
