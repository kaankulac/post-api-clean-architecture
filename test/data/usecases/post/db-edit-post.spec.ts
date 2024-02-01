import { DbEditPost } from '@data/usecases';
import { EditPostRepositorySpy, LoadPostByIdRepositorySpy } from '@test/data/mocks';
import { mockEditPostParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbEditPost;
    editPostRepositorySpy: EditPostRepositorySpy;
    loadPostByIdRepositorySpy: LoadPostByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
    const editPostRepositorySpy = new EditPostRepositorySpy();
    const loadPostByIdRepositorySpy = new LoadPostByIdRepositorySpy();
    const sut = new DbEditPost(editPostRepositorySpy, loadPostByIdRepositorySpy);
    return {
        sut,
        editPostRepositorySpy,
        loadPostByIdRepositorySpy
    };
};

describe('DbEditPost Usecase', () => {
    test('Should call EditPostRepository with correct values', async () => {
        const { sut, editPostRepositorySpy } = makeSut();
        const editParams = mockEditPostParams();
        await sut.edit(editParams);
        expect(editPostRepositorySpy.params).toEqual(editParams);
    });

    test('Should call LoadPostByIdRepository with correct values', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        const editParams = mockEditPostParams();
        await sut.edit(editParams);
        expect(loadPostByIdRepositorySpy.postId).toBe(editParams.id);
    });

    test('Should return false if EditPostRepository returns false', async () => {
        const { sut, editPostRepositorySpy } = makeSut();
        editPostRepositorySpy.result = false;
        const result = await sut.edit(mockEditPostParams());
        expect(result).toBe(false);
    });

    test('Should return false if LoadPostByIdRepository return null', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        loadPostByIdRepositorySpy.result = null;
        const result = await sut.edit(mockEditPostParams());
        expect(result).toBe(false);
    });

    test('Should throw if EditPostRepository throws', async () => {
        const { sut, editPostRepositorySpy } = makeSut();
        jest.spyOn(editPostRepositorySpy, 'edit').mockImplementationOnce(throwError);
        const promise = sut.edit(mockEditPostParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LoadPostByIdRepositoryThrows', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        jest.spyOn(loadPostByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.edit(mockEditPostParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.edit(mockEditPostParams());
        expect(result).toBe(true);
    });
});
