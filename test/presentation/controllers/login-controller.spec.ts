import { LoginController } from '@presentation/controllers';
import { badRequest, unauthorized, ok, serverError } from '@presentation/helpers';
import { throwError } from '@test/domain/mocks';
import { AuthenticationSpy, ValidationSpy } from '@test/presentation/mocks';

import { faker } from '@faker-js/faker';
import { ValidationError } from 'yup';

const mockRequest = (): LoginController.Request => ({
    username: faker.internet.userName(),
    password: faker.internet.password()
});

type SutType = {
    sut: LoginController;
    validationSpy: ValidationSpy;
    authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy();
    const authenticationSpy = new AuthenticationSpy();
    const sut = new LoginController(authenticationSpy, validationSpy);
    return {
        sut,
        validationSpy,
        authenticationSpy
    };
};

describe('Login Controller', () => {
    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(authenticationSpy.params).toEqual(request);
    });

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationSpy } = makeSut();
        authenticationSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(unauthorized());
    });

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authenticationSpy } = makeSut();
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 200 if valid credentials are provided', async () => {
        const { sut, authenticationSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(authenticationSpy.result));
    });

    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new ValidationError('any_error');
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });
});
