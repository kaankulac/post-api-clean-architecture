import { DbFollowUser } from '@data/usecases';
import { LoadUserByIdRepositorySpy, FollowUserRepositorySpy, AddFollowerRepositorySpy } from '@test/data/mocks';
import { mockFollowParams, throwError } from '@test/domain/mocks';

type SutTypes = {
    sut: DbFollowUser;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    followUserRepositorySpy: FollowUserRepositorySpy;
    addFollowerRepositorySpy: AddFollowerRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const followUserRepositorySpy = new FollowUserRepositorySpy();
    const addFollowerRepositorySpy = new AddFollowerRepositorySpy();
    const sut = new DbFollowUser(loadUserByIdRepositorySpy, followUserRepositorySpy, addFollowerRepositorySpy);

    return {
        sut,
        loadUserByIdRepositorySpy,
        followUserRepositorySpy,
        addFollowerRepositorySpy
    };
};

describe('DbFollowUser Usecase', () => {
    test('Should call LoadUserByIdRepository with correct values', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        const followParams = mockFollowParams();
        await sut.follow(followParams);
        expect(loadUserByIdRepositorySpy.userId).toBe(followParams.followed);
    });

    test('Should call FollowUserRepository with correct values', async () => {
        const { sut, followUserRepositorySpy } = makeSut();
        const followParams = mockFollowParams();
        await sut.follow(followParams);
        expect(followUserRepositorySpy.params.followed).toBe(followParams.followed);
        expect(followUserRepositorySpy.params.followedBy).toBe(followParams.followedBy);
    });

    test('Should call AddFollowerRepository with correct values', async () => {
        const { sut, addFollowerRepositorySpy } = makeSut();
        const followParams = mockFollowParams();
        await sut.follow(followParams);
        expect(addFollowerRepositorySpy.params.followed).toBe(followParams.followed);
        expect(addFollowerRepositorySpy.params.followedBy).toBe(followParams.followedBy);
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const result = await sut.follow(mockFollowParams());
        expect(result).toBe(true);
    });

    test('Should return false if LoadUserByIdRepository returns null', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        loadUserByIdRepositorySpy.result = null;
        const result = await sut.follow(mockFollowParams());
        expect(result).toBe(false);
    });

    test('Should throw if LoadUserByIdRepository throws', async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        jest.spyOn(loadUserByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.follow(mockFollowParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if FollowUserRepository throws', async () => {
        const { sut, followUserRepositorySpy } = makeSut();
        jest.spyOn(followUserRepositorySpy, 'follow').mockImplementationOnce(throwError);
        const promise = sut.follow(mockFollowParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should throw if AddFollowerRepository throws', async () => {
        const { sut, addFollowerRepositorySpy } = makeSut();
        jest.spyOn(addFollowerRepositorySpy, 'addFollower').mockImplementationOnce(throwError);
        const promise = sut.follow(mockFollowParams());
        await expect(promise).rejects.toThrow();
    });
});
