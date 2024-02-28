import { FollowController } from '@presentation/controllers';
import { FollowUserSpy, UnfollowUserSpy, ValidationSpy } from '@test/presentation/mocks';
import { serverError, ok } from '@presentation/helpers';
import { throwError } from '@test/domain/mocks';

import { faker } from '@faker-js/faker';

const mockRequest = (): FollowController.Request => ({
    followed: faker.string.uuid(),
    isFollow: true,
    userId: faker.string.uuid()
});

type SutType = {
    sut: FollowController;
    followUserSpy: FollowUserSpy;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutType => {
    const followUserSpy = new FollowUserSpy();
    const unfollowUserSpy = new UnfollowUserSpy();
    const validationSpy = new ValidationSpy();
    const sut = new FollowController(validationSpy, followUserSpy, unfollowUserSpy);
    return {
        sut,
        followUserSpy,
        validationSpy
    };
};

describe('Follow Controller', () => {
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

    test('Should call FollowUser with correct values', async () => {
        const { sut, followUserSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(followUserSpy.params).toEqual({ followed: request.followed, followedBy: request.userId });
    });

    test('Should return 500 if FollowUser throws', async () => {
        const { sut, followUserSpy } = makeSut();
        jest.spyOn(followUserSpy, 'follow').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 200 on success', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok('success'));
    });
});
