import { CreateUser, Authentication, FollowUser } from '@domain/usecases';

import { faker } from '@faker-js/faker';

export const mockCreateUserParams = (): CreateUser.Params => ({
    username: faker.internet.userName(),
    password: faker.internet.password()
});

export const mockAuthenticationParams = (): Authentication.Params => ({
    username: faker.internet.userName(),
    password: faker.internet.password()
});

export const mockFollowParams = (): FollowUser.Params => ({
    followed: faker.string.uuid(),
    followedBy: faker.string.uuid()
});
