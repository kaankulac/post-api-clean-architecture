import {
    CreatePostRepository,
    EditPostRepository,
    DeletePostRepository,
    LoadPostByIdRepository,
    LoadPostsByUserRepository,
    LikePostRepository,
    UnlikePostRepository
} from '@data/protocols';

import { faker } from '@faker-js/faker';
import { mockPostModels } from '@test/domain/mocks';

export class CreatePostRepositorySpy implements CreatePostRepository {
    params: CreatePostRepository.Params;
    result = true;

    async create(params: CreatePostRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class EditPostRepositorySpy implements EditPostRepository {
    params: EditPostRepository.Params;
    result = true;

    async edit(params: EditPostRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class DeletePostRepositorySpy implements DeletePostRepository {
    postId: DeletePostRepository.Params;
    result = true;

    async delete(postId: DeletePostRepository.Params): Promise<boolean> {
        this.postId = postId;
        return this.result;
    }
}

export class LoadPostByIdRepositorySpy implements LoadPostByIdRepository {
    postId: LoadPostByIdRepository.Params;
    result = {
        id: faker.string.uuid(),
        title: faker.lorem.words(5),
        description: faker.lorem.paragraph(),
        author: faker.string.uuid(),
        totalLikes: faker.number.int(1000),
        totalComments: faker.number.int(500),
        likes: Array.from(Array(faker.number.int(200)).keys()).map((value: number) => faker.string.uuid()),
        comments: Array.from(Array(faker.number.int(100)).keys()).map((value: number) => faker.string.uuid()),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    };

    async loadById(postId: LoadPostByIdRepository.Params): Promise<LoadPostByIdRepository.Result> {
        this.postId = postId;
        return this.result;
    }
}

export class LoadPostsByUserSpy implements LoadPostsByUserRepository {
    userId: LoadPostsByUserRepository.Params;
    result = mockPostModels();

    async loadByUser(userId: LoadPostsByUserRepository.Params): Promise<LoadPostsByUserRepository.Result> {
        this.userId = userId;
        return this.result;
    }
}

export class LikePostRepositorySpy implements LikePostRepository {
    params: LikePostRepository.Params;
    result = true;

    async likePost(params: LikePostRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}

export class UnlikePostRepositorySpy implements UnlikePostRepository {
    params: UnlikePostRepository.Params;
    result = true;

    async unlikePost(params: UnlikePostRepository.Params): Promise<boolean> {
        this.params = params;
        return this.result;
    }
}
