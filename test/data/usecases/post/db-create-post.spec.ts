import { DbCreatePost } from '@data/usecases';
import { CreatePostRepositorySpy } from '@test/data/mocks';
import { mockCreatePostParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbCreatePost;
    createPostRepositorySpy: CreatePostRepositorySpy;
};

const makeSut = (): SutTypes => {
    const createPostRepositorySpy = new CreatePostRepositorySpy();
    const sut = new DbCreatePost(createPostRepositorySpy);
    return {
        sut,
        createPostRepositorySpy
    };
};

describe('DbCreatePost Usecase', () => {
    test('Should call CreatePostRepository with correct values', async () => {
        const { sut, createPostRepositorySpy } = makeSut();
        const createParams = mockCreatePostParams();
        await sut.create(createParams);
        expect(createPostRepositorySpy.params).toEqual(createParams);
    });

    test('Should return false if CreatePostRepository returns false', async () => {
        const { sut, createPostRepositorySpy } = makeSut();
        createPostRepositorySpy.result = false;
        const result = await sut.create(mockCreatePostParams());
        expect(result).toBe(false);
    });

    test('Should throw if CreatePostRepository throws', async () => {
        const { sut, createPostRepositorySpy } = makeSut();
        jest.spyOn(createPostRepositorySpy, 'create').mockImplementationOnce(throwError);
        const promise = sut.create(mockCreatePostParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.create(mockCreatePostParams());
        expect(result).toBe(true);
    });
});
