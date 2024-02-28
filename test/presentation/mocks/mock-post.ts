import { CreatePost, LoadPosts } from '@domain/usecases';

import { faker } from '@faker-js/faker';

export class CreatePostSpy implements CreatePost {
    params: CreatePost.Params;
    result = true;

    async create(params: CreatePost.Params): Promise<CreatePost.Result> {
        this.params = params;
        return this.result;
    }
}

export class LoadPostsSpy implements LoadPosts {
    params: LoadPosts.Params;
    result = {
        posts: [
            {
                id: faker.string.uuid(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                author: faker.string.uuid(),
                totalLikes: 0,
                totalComments: 0,
                likes: [] as string[],
                comments: [] as string[],
                createdAt: faker.date.recent(),
                updatedAt: faker.date.recent()
            }
        ],
        totalCount: 1
    };

    async loadPosts(params: LoadPosts.Params): Promise<LoadPosts.Result> {
        this.params = params;
        return this.result;
    }
}
