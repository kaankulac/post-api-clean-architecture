import { DbLikeComment } from '@data/usecases';
import { LikeCommentRepositorySpy, UnlikeCommentRepositorySpy, LoadCommentByIdRepositorySpy } from '@test/data/mocks';
import { mockLikeCommentParams, mockUnlikeCommentParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbLikeComment;
    loadCommentByIdRepositorySpy: LoadCommentByIdRepositorySpy;
    likeCommentRepositorySpy: LikeCommentRepositorySpy;
    unlikeCommentRepositorySpy: UnlikeCommentRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadCommentByIdRepositorySpy = new LoadCommentByIdRepositorySpy();
    const likeCommentRepositorySpy = new LikeCommentRepositorySpy();
    const unlikeCommentRepositorySpy = new UnlikeCommentRepositorySpy();
    const sut = new DbLikeComment(likeCommentRepositorySpy, unlikeCommentRepositorySpy, loadCommentByIdRepositorySpy);
    return {
        sut,
        loadCommentByIdRepositorySpy,
        likeCommentRepositorySpy,
        unlikeCommentRepositorySpy
    };
};

describe('DbLikeComment Usecase', () => {
    test('Should call LoadCommentByIdRepository with correct values', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        const likeCommentParams = mockLikeCommentParams();
        await sut.like(likeCommentParams);
        expect(loadCommentByIdRepositorySpy.id).toBe(likeCommentParams.comment);
    });

    test('Should call LikeCommentRepository with correct values', async () => {
        const { sut, likeCommentRepositorySpy } = makeSut();
        const likeCommentParams = mockLikeCommentParams();
        await sut.like(likeCommentParams);
        expect(likeCommentRepositorySpy.params).toEqual({
            comment: likeCommentParams.comment,
            user: likeCommentParams.user
        });
    });

    test('Should call UnlikeCommentRepository with correct values', async () => {
        const { sut, unlikeCommentRepositorySpy } = makeSut();
        const unlikeCommentParams = mockUnlikeCommentParams();
        await sut.like(unlikeCommentParams);
        expect(unlikeCommentRepositorySpy.params).toEqual({
            comment: unlikeCommentParams.comment,
            user: unlikeCommentParams.user
        });
    });

    test('Should return false if LoadCommentByIdRepository returns null', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        loadCommentByIdRepositorySpy.result = null;
        const result = await sut.like(mockLikeCommentParams());
        expect(result).toBe(false);
    });

    test('Should return false if LikeCommentRepository returns false', async () => {
        const { sut, likeCommentRepositorySpy } = makeSut();
        likeCommentRepositorySpy.result = false;
        const result = await sut.like(mockLikeCommentParams());
        expect(result).toBe(false);
    });

    test('Should return false if UnlikeCommentRepository returns false', async () => {
        const { sut, unlikeCommentRepositorySpy } = makeSut();
        unlikeCommentRepositorySpy.result = false;
        const result = await sut.like(mockUnlikeCommentParams());
        expect(result).toBe(false);
    });

    test('LikeCommentRepository should not called if UnlikeComment params sends', async () => {
        const { sut, likeCommentRepositorySpy } = makeSut();
        const likeCommentSpy = jest.spyOn(likeCommentRepositorySpy, 'likeComment');
        await sut.like(mockUnlikeCommentParams());
        expect(likeCommentSpy).not.toHaveBeenCalled();
    });

    test('UnlikeCommentRepository should not called if LikeComment params sends', async () => {
        const { sut, unlikeCommentRepositorySpy } = makeSut();
        const unlikeCommentSpy = jest.spyOn(unlikeCommentRepositorySpy, 'unlikeComment');
        await sut.like(mockLikeCommentParams());
        expect(unlikeCommentSpy).not.toHaveBeenCalled();
    });

    test('Should throw if LoadCommentByIdRepository throws', async () => {
        const { sut, loadCommentByIdRepositorySpy } = makeSut();
        jest.spyOn(loadCommentByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.like(mockLikeCommentParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if LikeCommentRepository throws', async () => {
        const { sut, likeCommentRepositorySpy } = makeSut();
        jest.spyOn(likeCommentRepositorySpy, 'likeComment').mockImplementationOnce(throwError);
        const promise = sut.like(mockLikeCommentParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if UnlikeCommentRepository throws', async () => {
        const { sut, unlikeCommentRepositorySpy } = makeSut();
        jest.spyOn(unlikeCommentRepositorySpy, 'unlikeComment').mockImplementationOnce(throwError);
        const promise = sut.like(mockUnlikeCommentParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on like success', async () => {
        const { sut } = makeSut();
        const result = await sut.like(mockLikeCommentParams());
        expect(result).toBe(true);
    });

    test('Should return true on unlike success', async () => {
        const { sut } = makeSut();
        const result = await sut.like(mockUnlikeCommentParams());
        expect(result).toBe(true);
    });
});
