import { CreatePostController } from '@presentation/controllers';
import { badRequest, created, ok, serverError } from '@presentation/helpers';
import { throwError } from '@test/domain/mocks';
import { CreatePostSpy, ValidationSpy } from '@test/presentation/mocks';

import { faker } from '@faker-js/faker';

const mockRequest = (): CreatePostController.Request => ({
    title: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    userId: faker.string.uuid()
});

type SutType = {
    sut: CreatePostController;
    validationSpy: ValidationSpy;
    createPostSpy: CreatePostSpy;
};

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy();
    const createPostSpy = new CreatePostSpy();
    const sut = new CreatePostController(createPostSpy, validationSpy);
    return {
        sut,
        validationSpy,
        createPostSpy
    };
};

describe('CreatePost Controller', () => {
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

    test('Should call CreatePost with correct values', async () => {
        const { sut, createPostSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(createPostSpy.params).toEqual({
            title: request.title,
            description: request.description,
            author: request.userId,
            userId: request.userId
        });
    });

    test('Should return 500 if CreatePost throws', async () => {
        const { sut, createPostSpy } = makeSut();
        jest.spyOn(createPostSpy, 'create').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 200 on success', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(created());
    });
});
