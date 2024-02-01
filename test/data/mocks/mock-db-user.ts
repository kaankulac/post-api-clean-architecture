import {
    CreateUserRepository,
    LoadUserByIdRepository,
    LoadUserByTokenRepository,
    LoadUserByUsernameRepository,
    CheckUserByUsernameRepository,
    UpdateAccessTokenRepository,
    FollowUserRepository,
    UnfollowUserRepository,
    AddFollowerRepository,
    RemoveFollowerRepository
} from '@data/protocols';

import { faker } from '@faker-js/faker';

export class CreateUserRepositorySpy implements CreateUserRepository {
    params: CreateUserRepository.Params;
    result = true;

    async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
        this.params = params;
        return this.result;
    }
}

export class LoadUserByIdRepositorySpy implements LoadUserByIdRepository {
    userId: LoadUserByIdRepository.Params;
    result = {
        id: faker.string.uuid(),
        username: faker.internet.userName()
    };

    async loadById(userId: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
        this.userId = userId;
        return this.result;
    }
}

export class LoadUserByTokenRepositorySpy implements LoadUserByTokenRepository {
    params: LoadUserByTokenRepository.Params;
    result = {
        id: faker.string.uuid()
    };

    async loadByToken(params: LoadUserByTokenRepository.Params): Promise<LoadUserByTokenRepository.Result> {
        this.params = params;
        return this.result;
    }
}

export class LoadUserByUsernameRepositorySpy implements LoadUserByUsernameRepository {
    params: LoadUserByUsernameRepository.Params;
    result = {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        password: faker.internet.password()
    };

    async loadByUsername(params: LoadUserByUsernameRepository.Params): Promise<LoadUserByUsernameRepository.Result> {
        this.params = params;
        return this.result;
    }
}

export class CheckUserByUsernameRepositorySpy implements CheckUserByUsernameRepository {
    params: CheckUserByUsernameRepository.Params;
    result = false;

    async checkByUserName(params: CheckUserByUsernameRepository.Params): Promise<CheckUserByUsernameRepository.Result> {
        this.params = params;
        return this.result;
    }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    params: UpdateAccessTokenRepository.Params;

    async updateAccessToken(params: UpdateAccessTokenRepository.Params): Promise<void> {
        this.params = params;
    }
}

export class FollowUserRepositorySpy implements FollowUserRepository {
    params: FollowUserRepository.Params;
    addFollower = new AddFollowerRepositorySpy().addFollower;

    async follow(params: FollowUserRepository.Params): Promise<void> {
        this.params = params;
        this.addFollower(params);
    }
}

export class UnfollowUserRepositorySpy implements UnfollowUserRepository {
    params: UnfollowUserRepository.Params;
    removeFollower = new RemoveFollowerRepositorySpy().removeFollower;

    async unfollow(params: UnfollowUserRepository.Params): Promise<void> {
        this.params = params;
        this.removeFollower(params);
    }
}

export class AddFollowerRepositorySpy implements AddFollowerRepository {
    params: AddFollowerRepository.Params;

    async addFollower(params: AddFollowerRepository.Params): Promise<void> {
        this.params = params;
    }
}

export class RemoveFollowerRepositorySpy implements RemoveFollowerRepository {
    params: RemoveFollowerRepository.Params;

    async removeFollower(params: RemoveFollowerRepository.Params): Promise<void> {
        this.params = params;
    }
}
