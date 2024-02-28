import { PostDocument } from '@domain/models';
import { CreatePost, EditPost, LikePost } from '@domain/usecases';

import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

export const mockPostModel = (): PostDocument => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraph(),
    author: faker.string.uuid(),
    totalLikes: faker.number.int(200),
    totalComments: faker.number.int(100),
    likes: Array.from(Array(faker.number.int(200)).keys()).map((value: number) => faker.string.uuid()),
    comments: Array.from(Array(faker.number.int(100)).keys()).map((value: number) => faker.string.uuid()),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
});

export const mockPostModels = (): PostDocument[] => [mockPostModel(), mockPostModel(), mockPostModel()];

export const mockCreatePostParams = (): CreatePost.Params => ({
    title: 'titeltelte',
    description: faker.lorem.paragraph(),
    author: new Types.ObjectId().toString()
});

export const mockEditPostParams = (): EditPost.Params => ({
    id: faker.string.uuid(),
    title: 'titltelte',
    description: faker.lorem.paragraph()
});

export const mockLikePostParams = (): LikePost.Params => ({
    post: faker.string.uuid(),
    user: faker.string.uuid(),
    like: true
});

export const mockUnlikePostParams = (): LikePost.Params => ({
    post: faker.string.uuid(),
    user: faker.string.uuid(),
    like: false
});
