import { AuthMiddleware } from '@presentation/middlewares';
import { ok, serverError, unauthorized } from '@presentation/helpers';
import { LoadUserByTokenSpy } from '@test/presentation/mocks';
import { throwError } from '@test/domain/mocks';

const mockRequest = (): AuthMiddleware.Request => ({
    accessToken: 'any_token'
});

type SutTypes = {
    sut: AuthMiddleware;
    loadUserByTokenSpy: LoadUserByTokenSpy;
};

const makeSut = (): SutTypes => {
    const loadUserByTokenSpy = new LoadUserByTokenSpy();
    const sut = new AuthMiddleware(loadUserByTokenSpy);
    return {
        sut,
        loadUserByTokenSpy
    };
};

describe('Auth Middleware', () => {
    test('Should return 401 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(unauthorized());
    });

    test('Should call LoadUserByToken with correct accessToken', async () => {
        const role = 'any_role';
        const { sut, loadUserByTokenSpy } = makeSut();
        const httpRequest = mockRequest();
        await sut.handle(httpRequest);
        expect(loadUserByTokenSpy.accessToken).toBe(httpRequest.accessToken);
    });

    test('Should return 401 if LoadUserByToken returns null', async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        loadUserByTokenSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(unauthorized());
    });

    test('Should return 200 if LoadUserByToken returns an user', async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(
            ok({
                userId: loadUserByTokenSpy.result.id
            })
        );
    });

    test('Should return 500 if LoadUserByToken throws', async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        jest.spyOn(loadUserByTokenSpy, 'load').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
