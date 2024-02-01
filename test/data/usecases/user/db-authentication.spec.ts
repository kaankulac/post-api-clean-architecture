import { DbAuthentication } from '@data/usecases';
import {
    HashComparerSpy,
    EncrypterSpy,
    UpdateAccessTokenRepositorySpy,
    LoadUserByUsernameRepositorySpy
} from '@test/data/mocks';
import { throwError, mockAuthenticationParams } from '@test/domain/mocks';

type SutTypes = {
    sut: DbAuthentication;
    loadUserByUsernameRepositorySpy: LoadUserByUsernameRepositorySpy;
    hashComparerSpy: HashComparerSpy;
    encrypterSpy: EncrypterSpy;
    updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByUsernameRepositorySpy = new LoadUserByUsernameRepositorySpy();
    const hashComparerSpy = new HashComparerSpy();
    const encrypterSpy = new EncrypterSpy();
    const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy();
    const sut = new DbAuthentication(
        loadUserByUsernameRepositorySpy,
        updateAccessTokenRepositorySpy,
        hashComparerSpy,
        encrypterSpy
    );

    return {
        sut,
        loadUserByUsernameRepositorySpy,
        hashComparerSpy,
        encrypterSpy,
        updateAccessTokenRepositorySpy
    };
};

describe('DbAuthentication Usecase', () => {
    test('Should call LoadUserByUsernameRepository with correct username', async () => {
        const { sut, loadUserByUsernameRepositorySpy } = makeSut();
        const authenticationParams = mockAuthenticationParams();
        await sut.auth(authenticationParams);
        expect(loadUserByUsernameRepositorySpy.params).toBe(authenticationParams.username);
    });

    test('Should throw if LoadUserByUsernameRepository throws', async () => {
        const { sut, loadUserByUsernameRepositorySpy } = makeSut();
        jest.spyOn(loadUserByUsernameRepositorySpy, 'loadByUsername').mockImplementationOnce(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return null if LoadUserByUsername returns null', async () => {
        const { sut, loadUserByUsernameRepositorySpy } = makeSut();
        loadUserByUsernameRepositorySpy.result = null;
        const model = await sut.auth(mockAuthenticationParams());
        expect(model).toBeNull();
    });

    test('Should call HashComparer with correct values', async () => {
        const { sut, hashComparerSpy, loadUserByUsernameRepositorySpy } = makeSut();
        const authParams = mockAuthenticationParams();
        await sut.auth(authParams);
        expect(hashComparerSpy.plainText).toBe(authParams.password);
        expect(hashComparerSpy.digest).toBe(loadUserByUsernameRepositorySpy.result.password);
    });

    test('Should throw if HashComparer throws', async () => {
        const { sut, hashComparerSpy } = makeSut();
        jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return null if HashComparer returns false', async () => {
        const { sut, hashComparerSpy } = makeSut();
        hashComparerSpy.isValid = false;
        const model = await sut.auth(mockAuthenticationParams());
        expect(model).toBeNull();
    });

    test('Should call Encrypter with correct values', async () => {
        const { sut, encrypterSpy, loadUserByUsernameRepositorySpy } = makeSut();
        await sut.auth(mockAuthenticationParams());
        expect(encrypterSpy.plainText).toBe(loadUserByUsernameRepositorySpy.result.id);
    });

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterSpy } = makeSut();
        jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    test('Should return a data on success', async () => {
        const { sut, encrypterSpy, loadUserByUsernameRepositorySpy } = makeSut();
        const { accessToken, username } = await sut.auth(mockAuthenticationParams());
        expect(accessToken).toBe(encrypterSpy.cipherText);
        expect(username).toBe(loadUserByUsernameRepositorySpy.result.username);
    });

    test('Should call UpdateAccessToken with correct values', async () => {
        const { sut, updateAccessTokenRepositorySpy, loadUserByUsernameRepositorySpy, encrypterSpy } = makeSut();
        await sut.auth(mockAuthenticationParams());
        expect(updateAccessTokenRepositorySpy.params.id).toBe(loadUserByUsernameRepositorySpy.result.id);
        expect(updateAccessTokenRepositorySpy.params.token).toBe(encrypterSpy.cipherText);
    });

    test('Should throw if UpdateAccessToken throws', async () => {
        const { sut, updateAccessTokenRepositorySpy } = makeSut();
        jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });
});
