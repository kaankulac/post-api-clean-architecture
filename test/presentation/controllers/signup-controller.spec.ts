import { SignUpController } from '@presentation/controllers';
import { badRequest, forbidden, ok, serverError } from '@presentation/helpers';
import { throwError } from '@test/domain/mocks';
import { UsernameInUseError } from '@domain/errors';
import { AuthenticationSpy, ValidationSpy, CreateUserSpy } from '@test/presentation/mocks';

import { faker } from '@faker-js/faker';

const mockRequest = (): SignUpController.Request => {
    const password = faker.internet.password();
    return {
        username: faker.internet.userName(),
        password,
        passwordConfirmation: password
    };
};

type SutType = {
    sut: SignUpController;
    validationSpy: ValidationSpy;
    createUserSpy: CreateUserSpy;
    authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy();
    const createUserSpy = new CreateUserSpy();
    const authenticationSpy = new AuthenticationSpy();
    const sut = new SignUpController(createUserSpy, authenticationSpy, validationSpy);
    return {
        sut,
        validationSpy,
        createUserSpy,
        authenticationSpy
    };
};

describe('Signup Controller', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new Error();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    test('Should call CreateUser with correct values', async () => {
        const { sut, createUserSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(createUserSpy.params).toEqual({ username: request.username, password: request.password });
    });

    test('Should return 500 if CreateUser throws', async () => {
        const { sut, createUserSpy } = makeSut();
        jest.spyOn(createUserSpy, 'create').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 403 if CreateUser returns null', async () => {
        const { sut, createUserSpy } = makeSut();
        createUserSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(forbidden(new UsernameInUseError()));
    });

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(authenticationSpy.params).toEqual({ username: request.username, password: request.password });
    });

    test('Should return 200 on success', async () => {
        const { sut, authenticationSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(authenticationSpy.result));
    });

    test('Should return 500 if Authentication throws', async () => {
        const { sut, authenticationSpy } = makeSut();
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
