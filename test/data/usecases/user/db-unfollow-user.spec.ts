import { DbUnfollowUser } from '@data/usecases';
import { LoadUserByIdRepositorySpy, UnfollowUserRepositorySpy, RemoveFollowerRepositorySpy } from '@test/data/mocks';
import { mockFollowParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbUnfollowUser;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    unfollowUserRepositorySpy: UnfollowUserRepositorySpy;
    removeFollowerRepositorySpy: RemoveFollowerRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const unfollowUserRepositorySpy = new UnfollowUserRepositorySpy();
    const removeFollowerRepositorySpy = new RemoveFollowerRepositorySpy();
    const sut = new DbUnfollowUser(loadUserByIdRepositorySpy, unfollowUserRepositorySpy, removeFollowerRepositorySpy);
    return {
        sut,
        loadUserByIdRepositorySpy,
        unfollowUserRepositorySpy,
        removeFollowerRepositorySpy
    };
};

describe('DbUnfollowUser Usecase', () => {
    test('Should call LoadUserByIdRepository with correct values', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        const followParams = mockFollowParams();
        await sut.unfollow(followParams);
        expect(loadUserByIdRepositorySpy.userId).toBe(followParams.followed);
    });

    test('Should call UnfollowUserRepository with correct values', async () => {
        const { sut, unfollowUserRepositorySpy } = makeSut();
        const followParams = mockFollowParams();
        await sut.unfollow(followParams);
        expect(unfollowUserRepositorySpy.params.followed).toBe(followParams.followed);
        expect(unfollowUserRepositorySpy.params.followedBy).toBe(followParams.followedBy);
    });

    test('Should call RemoveFollowerRepository with correct values', async () => {
        const { sut, removeFollowerRepositorySpy } = makeSut();
        const followParams = mockFollowParams();
        await sut.unfollow(followParams);
        expect(removeFollowerRepositorySpy.params.followed).toBe(followParams.followed);
        expect(removeFollowerRepositorySpy.params.followedBy).toBe(followParams.followedBy);
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.unfollow(mockFollowParams());
        expect(result).toBe(true);
    });

    test('Should return false if LoadUserByIdRepository returns null', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        loadUserByIdRepositorySpy.result = null;
        const result = await sut.unfollow(mockFollowParams());
        expect(result).toBe(false);
    });

    test('Should throw if LoadUserByIdRepository throws', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        jest.spyOn(loadUserByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.unfollow(mockFollowParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if UnfollowUserRepository throws', async () => {
        const { sut, unfollowUserRepositorySpy } = makeSut();
        jest.spyOn(unfollowUserRepositorySpy, 'unfollow').mockImplementationOnce(throwError);
        const promise = sut.unfollow(mockFollowParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if RemoveFollowerRepository throws', async () => {
        const { sut, removeFollowerRepositorySpy } = makeSut();
        jest.spyOn(removeFollowerRepositorySpy, 'removeFollower').mockImplementationOnce(throwError);
        const promise = sut.unfollow(mockFollowParams());
        await expect(promise).rejects.toThrow();
    });
});
