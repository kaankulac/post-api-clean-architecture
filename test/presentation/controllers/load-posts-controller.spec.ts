import { LoadPostsController } from '@presentation/controllers';
import { ok, serverError } from '@presentation/helpers';
import { throwError } from '@test/domain/mocks';
import { LoadPostsSpy, ValidationSpy } from '@test/presentation/mocks';

import { faker } from '@faker-js/faker';

const mockRequest = (): LoadPostsController.Request => ({
    per: '5',
    page: '0'
});

type SutType = {
    sut: LoadPostsController;
    loadPostsSpy: LoadPostsSpy;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutType => {
    const loadPostsSpy = new LoadPostsSpy();
    const validationSpy = new ValidationSpy();
    const sut = new LoadPostsController(loadPostsSpy, validationSpy);
    return {
        sut,
        loadPostsSpy,
        validationSpy
    };
};

describe('LoadPosts Controller', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationSpy } = makeSut();
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should call LoadPosts with correct values', async () => {
        const { sut, loadPostsSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(loadPostsSpy.params).toEqual({ per: Number(request.per), page: Number(request.page) });
    });

    test('Should return 500 if LoadPosts throws', async () => {
        const { sut, loadPostsSpy } = makeSut();
        jest.spyOn(loadPostsSpy, 'loadPosts').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 200 on success', async () => {
        const { sut, loadPostsSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(loadPostsSpy.result));
    });
});
