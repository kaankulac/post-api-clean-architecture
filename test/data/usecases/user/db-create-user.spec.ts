import { DbCreateUser } from '@data/usecases';
import { mockCreateUserParams, throwError } from '@test/domain/mocks';
import { HasherSpy, CreateUserRepositorySpy, CheckUserByUsernameRepositorySpy } from '@test/data/mocks';

type SutTypes = {
    sut: DbCreateUser;
    hasherSpy: HasherSpy;
    createUserRepositorySpy: CreateUserRepositorySpy;
    checkUserByUsernameRepositorySpy: CheckUserByUsernameRepositorySpy;
};

const makeSut = (): SutTypes => {
    const checkUserByUsernameRepositorySpy = new CheckUserByUsernameRepositorySpy();
    const hasherSpy = new HasherSpy();
    const createUserRepositorySpy = new CreateUserRepositorySpy();
    const sut = new DbCreateUser(hasherSpy, createUserRepositorySpy, checkUserByUsernameRepositorySpy);
    return {
        sut,
        hasherSpy,
        createUserRepositorySpy,
        checkUserByUsernameRepositorySpy
    };
};

describe('DbCreateUser Usecase', () => {
    test('Should call Hasher with correct values', async () => {
        const { sut, hasherSpy } = makeSut();
        const createUserParams = mockCreateUserParams();
        await sut.create(createUserParams);
        expect(hasherSpy.plainText).toBe(createUserParams.password);
    });

    test('Should throw if Hasher throws', async () => {
        const { sut, hasherSpy } = makeSut();
        jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);
        const promise = sut.create(mockCreateUserParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should call CreateUserRepository with correct values', async () => {
        const { sut, hasherSpy, createUserRepositorySpy } = makeSut();
        const createUserParams = mockCreateUserParams();
        await sut.create(createUserParams);
        expect(createUserRepositorySpy.params).toEqual({
            username: createUserParams.username,
            password: hasherSpy.digest
        });
    });

    test('Should throw if CreateUserRepository throws', async () => {
        const { sut, createUserRepositorySpy } = makeSut();
        jest.spyOn(createUserRepositorySpy, 'create').mockImplementationOnce(throwError);
        const promise = sut.create(mockCreateUserParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return true on success', async () => {
        const { sut } = makeSut();
        const isValid = await sut.create(mockCreateUserParams());
        expect(isValid).toBe(true);
    });

    test('Should return false if CreateUserRepository returns false', async () => {
        const { sut, createUserRepositorySpy } = makeSut();
        createUserRepositorySpy.result = false;
        const isValid = await sut.create(mockCreateUserParams());
        expect(isValid).toBe(false);
    });

    test('Should return false if CheckAccountByUsernameRepository returns true', async () => {
        const { sut, checkUserByUsernameRepositorySpy } = makeSut();
        checkUserByUsernameRepositorySpy.result = true;
        const isValid = await sut.create(mockCreateUserParams());
        expect(isValid).toBe(false);
    });

    test('Should call CheckUserByUsernameRepository with correct username', async () => {
        const { sut, checkUserByUsernameRepositorySpy } = makeSut();
        const createUserParams = mockCreateUserParams();
        await sut.create(createUserParams);
        expect(checkUserByUsernameRepositorySpy.params).toBe(createUserParams.username);
    });
});
