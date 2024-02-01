import { DbEditComment } from '@data/usecases';
import { EditCommentRepositorySpy } from '@test/data/mocks';
import { mockEditCommentParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbEditComment;
    editCommentRepositorySpy: EditCommentRepositorySpy;
};

const makeSut = (): SutTypes => {
    const editCommentRepositorySpy = new EditCommentRepositorySpy();
    const sut = new DbEditComment(editCommentRepositorySpy);
    return {
        sut,
        editCommentRepositorySpy
    };
};

describe('DbEditComment Usecase', () => {
    test('Should call EditCommentRepository with correct values', async () => {
        const { sut, editCommentRepositorySpy } = makeSut();
        const editCommentParams = mockEditCommentParams();
        await sut.edit(editCommentParams);
        expect(editCommentRepositorySpy.params).toEqual(editCommentParams);
    });

    test('Should return false if EditCommentRepository returns false', async () => {
        const { sut, editCommentRepositorySpy } = makeSut();
        editCommentRepositorySpy.result = false;
        const result = await sut.edit(mockEditCommentParams());
        expect(result).toBe(false);
    });

    test('Should throw if EditCommentRepository throws', async () => {
        const { sut, editCommentRepositorySpy } = makeSut();
        jest.spyOn(editCommentRepositorySpy, 'edit').mockImplementationOnce(throwError);
        const promise = sut.edit(mockEditCommentParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.edit(mockEditCommentParams());
        expect(result).toBe(true);
    });
});
