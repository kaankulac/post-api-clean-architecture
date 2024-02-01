import { CommentMongoRepository, MongoHelper } from '@infrastructure/repositories';
import { mockCreateCommentParams, mockEditCommentParams } from '@test/domain/mocks';
import env from '@main/config/env';

import { Collection } from 'mongoose';
import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { Comment } from '@domain/schemas';

const makeSut = (): CommentMongoRepository => {
    return new CommentMongoRepository();
};

let commentCollection: Collection;

describe('CommentMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        commentCollection = MongoHelper.getCollection('comments');
        await commentCollection.deleteMany({});
    });

    describe('create', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const result = await sut.create(mockCreateCommentParams());
            expect(result).toBe(true);
        });
    });

    describe('edit', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const res = await commentCollection.insertOne(mockCreateCommentParams());
            const result = await sut.edit({ ...mockEditCommentParams(), commentId: res.insertedId.toString() });
            expect(result).toBe(true);
        });

        test('Should return false on failure', async () => {
            const sut = makeSut();
            const result = await sut.edit(mockEditCommentParams());
            expect(result).toBe(false);
        });
    });

    describe('delete', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const res = await commentCollection.insertOne(mockCreateCommentParams());
            const result = await sut.delete(res.insertedId.toString());
            expect(result).toBe(true);
        });

        test('Should return false on failure', async () => {
            const sut = makeSut();
            const result = await sut.delete(new ObjectId().toString());
            expect(result).toBe(false);
        });
    });

    describe('loadById', () => {
        test('Should return comment on success', async () => {
            const sut = makeSut();
            const res = await commentCollection.insertOne(mockCreateCommentParams());
            const result = await sut.loadById(res.insertedId.toString());
            expect(result.id).toBe(res.insertedId.toString());
        });

        test('Should return null on failure', async () => {
            const sut = makeSut();
            const result = await sut.loadById(new ObjectId().toString());
            expect(result).toBeNull();
        });
    });

    describe('loadByComment', () => {
        let replyTo: string = new ObjectId().toString();

        beforeEach(() => {
            replyTo = new ObjectId().toHexString();
        });

        test('Should return comments on success', async () => {
            const sut = makeSut();
            await commentCollection.insertMany([
                { ...mockCreateCommentParams(), replyTo },
                { ...mockCreateCommentParams(), replyTo },
                { ...mockCreateCommentParams(), replyTo }
            ]);
            const f = await Comment.find({});
            const find = await Comment.find({ totalComments: 0 });
            expect(f).toEqual('f');
            const result = await sut.loadByComment(replyTo);
            expect(result).toHaveLength(3);
        });

        test('Should return [] when no comments found', async () => {
            const sut = makeSut();
            const result = await sut.loadByComment(replyTo);
            expect(result).toEqual([]);
        });
    });

    describe('loadByPost', () => {
        let post: string = new ObjectId().toString();

        beforeEach(() => {
            post = new ObjectId().toString();
        });

        test('Should return comments on success', async () => {
            const sut = makeSut();
            await commentCollection.insertMany([
                { ...mockCreateCommentParams(), post },
                { ...mockCreateCommentParams(), post },
                { ...mockCreateCommentParams(), post }
            ]);
            const result = await sut.loadByPost(post);
            expect(result).toHaveLength(3);
        });

        test('Should return [] when no comments found', async () => {
            const sut = makeSut();
            const result = await sut.loadByPost(post);
            expect(result).toEqual([]);
        });
    });

    describe('loadByUser', () => {
        let author: string = new ObjectId().toString();

        beforeEach(() => {
            author = new ObjectId().toString();
        });

        test('Should return comments on success', async () => {
            const sut = makeSut();
            await commentCollection.insertOne(mockCreateCommentParams());
            const result = await sut.loadByUser(author);
            expect(result).toHaveLength(1);
        });

        test('Should return [] when no comments found', async () => {
            const sut = makeSut();
            const result = await sut.loadByUser(author);
            expect(result).toEqual([]);
        });
    });

    describe('likeComment', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const result = await sut.likeComment({ comment: faker.string.uuid(), user: faker.string.uuid() });
            expect(result).toBe(true);
        });
    });

    describe('unlikePost', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const result = await sut.unlikeComment({ comment: faker.string.uuid(), user: faker.string.uuid() });
            expect(result).toBe(true);
        });
    });
});
