import { CommentDocument } from '@domain/models';
import { CreateComment, EditComment, LikeComment } from '@domain/usecases';

import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export const mockCommentModel = (): CommentDocument => ({
    id: faker.string.uuid(),
    comment: faker.lorem.sentence(),
    author: new ObjectId(),
    post: new ObjectId(),
    totalLikes: faker.number.int(200),
    totalComments: faker.number.int(100),
    likes: Array.from(Array(faker.number.int(200)).keys()).map((value: number) => faker.string.uuid()),
    comments: Array.from(Array(faker.number.int(100)).keys()).map((value: number) => faker.string.uuid()),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
});

export const mockCommentModels = (): CommentDocument[] => [
    mockCommentModel(),
    mockCommentModel(),
    mockCommentModel(),
    mockCommentModel()
];

export const mockCreateCommentParams = (): CreateComment.Params => ({
    comment: faker.lorem.sentence(),
    author: new ObjectId(),
    post: new ObjectId()
});

export const mockEditCommentParams = (): EditComment.Params => ({
    commentId: new ObjectId(),
    comment: faker.lorem.sentence()
});

export const mockLikeCommentParams = (): LikeComment.Params => ({
    user: new ObjectId(),
    comment: new ObjectId(),
    like: true
});

export const mockUnlikeCommentParams = (): LikeComment.Params => ({
    user: new ObjectId(),
    comment: new ObjectId(),
    like: false
});
