import { DbLikePost } from '@data/usecases';
import { LikePostRepositorySpy, UnlikePostRepositorySpy, LoadPostByIdRepositorySpy } from '@test/data/mocks';
import { mockLikePostParams, mockUnlikePostParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbLikePost;
    loadPostByIdRepositorySpy: LoadPostByIdRepositorySpy;
    likePostRepositorySpy: LikePostRepositorySpy;
    unlikePostRepositorySpy: UnlikePostRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadPostByIdRepositorySpy = new LoadPostByIdRepositorySpy();
    const likePostRepositorySpy = new LikePostRepositorySpy();
    const unlikePostRepositorySpy = new UnlikePostRepositorySpy();
    const sut = new DbLikePost(likePostRepositorySpy, unlikePostRepositorySpy, loadPostByIdRepositorySpy);
    return {
        sut,
        loadPostByIdRepositorySpy,
        likePostRepositorySpy,
        unlikePostRepositorySpy
    };
};

describe('DbLikePost UseCase', () => {
    test('Should call LoadPostByIdRepository with correct values', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        const likePostParams = mockLikePostParams();
        await sut.like(likePostParams);
        expect(loadPostByIdRepositorySpy.postId).toBe(likePostParams.post);
    });

    test('Should call LikePostRepository with correct values', async () => {
        const { sut, likePostRepositorySpy } = makeSut();
        const likePostParams = mockLikePostParams();
        await sut.like(likePostParams);
        expect(likePostRepositorySpy.params.post).toBe(likePostParams.post);
        expect(likePostRepositorySpy.params.user).toBe(likePostParams.user);
    });

    test('Should call UnlikePostRepository with correct values', async () => {
        const { sut, unlikePostRepositorySpy } = makeSut();
        const unlikePostParams = mockUnlikePostParams();
        await sut.like(unlikePostParams);
        expect(unlikePostRepositorySpy.params.post).toBe(unlikePostParams.post);
        expect(unlikePostRepositorySpy.params.user).toBe(unlikePostParams.user);
    });

    test('Should return false if LoadPostByIdRepository returns null', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        loadPostByIdRepositorySpy.result = null;
        const result = await sut.like(mockLikePostParams());
        expect(result).toBe(false);
    });

    test('Should return false if LikePostRepository returns false', async () => {
        const { sut, likePostRepositorySpy } = makeSut();
        likePostRepositorySpy.result = false;
        const result = await sut.like(mockLikePostParams());
        expect(result).toBe(false);
    });

    test('Should return false if UnlikePostRepository returns false', async () => {
        const { sut, unlikePostRepositorySpy } = makeSut();
        unlikePostRepositorySpy.result = false;
        const result = await sut.like(mockUnlikePostParams());
        expect(result).toBe(false);
    });

    test('LikePostRepository should not called if UnlikeParams sends', async () => {
        const { sut, likePostRepositorySpy } = makeSut();
        const likePostSpy = jest.spyOn(likePostRepositorySpy, 'likePost');
        await sut.like(mockUnlikePostParams());
        expect(likePostSpy).not.toHaveBeenCalled();
    });

    test('UnlikeRepository should not called if LikeParams sends', async () => {
        const { sut, unlikePostRepositorySpy } = makeSut();
        const unlikePostSpy = jest.spyOn(unlikePostRepositorySpy, 'unlikePost');
        await sut.like(mockLikePostParams());
        expect(unlikePostSpy).not.toHaveBeenCalled();
    });

    test('Should throw if LoadPostByIdRepository throws', async () => {
        const { sut, loadPostByIdRepositorySpy } = makeSut();
        jest.spyOn(loadPostByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.like(mockLikePostParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LikePostRepository throws', async () => {
        const { sut, likePostRepositorySpy } = makeSut();
        jest.spyOn(likePostRepositorySpy, 'likePost').mockImplementationOnce(throwError);
        const promise = sut.like(mockLikePostParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if UnlikePostRepository throws', async () => {
        const { sut, unlikePostRepositorySpy } = makeSut();
        jest.spyOn(unlikePostRepositorySpy, 'unlikePost').mockImplementationOnce(throwError);
        const promise = sut.like(mockUnlikePostParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on like success', async () => {
        const { sut } = makeSut();
        const result = await sut.like(mockLikePostParams());
        expect(result).toBe(true);
    });

    test('Should return true on like success', async () => {
        const { sut } = makeSut();
        const result = await sut.like(mockUnlikePostParams());
        expect(result).toBe(true);
    });
});
