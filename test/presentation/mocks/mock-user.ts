import { CreateUser, Authentication, LoadUserByToken, FollowUser, UnfollowUser } from '@domain/usecases';

import { faker } from '@faker-js/faker';

export class CreateUserSpy implements CreateUser {
    params: CreateUser.Params;
    result = true;

    async create(params: CreateUser.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class AuthenticationSpy implements Authentication {
    params: Authentication.Params;
    result = {
        accessToken: faker.string.uuid(),
        username: faker.internet.userName()
    };

    async auth(params: Authentication.Params): Promise<Authentication.Result> {
        this.params = params;
        return this.result;
    }
}

export class LoadUserByTokenSpy implements LoadUserByToken {
    accessToken: string;
    result = {
        id: faker.string.uuid()
    };

    async load(accessToken: string): Promise<LoadUserByToken.Result> {
        this.accessToken = accessToken;
        return this.result;
    }
}

export class FollowUserSpy implements FollowUser {
    params: FollowUser.Params;
    result = true;

    async follow(params: FollowUser.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class UnfollowUserSpy implements UnfollowUser {
    params: UnfollowUser.Params;
    result = true;

    async unfollow(params: UnfollowUser.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}
