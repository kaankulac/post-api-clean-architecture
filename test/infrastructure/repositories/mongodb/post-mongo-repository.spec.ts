import { PostMongoRepository, MongoHelper } from '@infrastructure/repositories';
import { mockCreatePostParams, mockEditPostParams } from '@test/domain/mocks';
import env from '@main/config/env';

import { Collection, Types } from 'mongoose';

const makeSut = (): PostMongoRepository => {
    return new PostMongoRepository();
};

let postCollection: Collection;

describe('PostMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        postCollection = MongoHelper.getCollection('posts');
        await postCollection.deleteMany({});
    });

    describe('create', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const result = await sut.create(mockCreatePostParams());
            expect(result).toBe(true);
        });
    });

    describe('delete', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const res = await postCollection.insertOne(mockCreatePostParams());
            const result = await sut.delete(res.insertedId?.toString());
            expect(result).toBe(true);
        });

        test('Should return false on failure', async () => {
            const sut = makeSut();
            const result = await sut.delete(new Types.ObjectId()?.toString());
            expect(result).toBe(false);
        });
    });

    describe('edit', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const res = await postCollection.insertOne(mockCreatePostParams());
            const result = await sut.edit({ ...mockEditPostParams(), id: res.insertedId?.toString() });
            expect(result).toBe(true);
        });

        test('Should return false on failure', async () => {
            const sut = makeSut();
            const result = await sut.edit({ ...mockEditPostParams(), id: new Types.ObjectId()?.toString() });
            expect(result).toBe(false);
        });
    });

    describe('loadById', () => {
        test('Should return post on success', async () => {
            const sut = makeSut();
            const res = await postCollection.insertOne(mockCreatePostParams());
            const result = await sut.loadById(res.insertedId?.toString());
            expect(result.id).toBe(res.insertedId.toString());
        });

        test('Should return null on failure', async () => {
            const sut = makeSut();
            const result = await sut.loadById(new Types.ObjectId()?.toString());
            expect(result).toBeNull();
        });
    });

    describe('loadByUser', () => {
        let author: Types.ObjectId;

        beforeEach(() => {
            author = new Types.ObjectId();
        });
        test('Should return posts on success', async () => {
            const sut = makeSut();
            await postCollection.insertMany([
                { ...mockCreatePostParams(), author },
                { ...mockCreatePostParams(), author },
                { ...mockCreatePostParams(), author }
            ]);
            const result = await sut.loadByUser(author.toString());
            expect(result).toHaveLength(3);
        });

        test('Should return [] when no posts found', async () => {
            const sut = makeSut();
            const result = await sut.loadByUser(author.toString());
            expect(result).toEqual([]);
        });
    });

    describe('likePost', () => {
        let user: string;

        beforeEach(() => {
            user = new Types.ObjectId().toString();
        });
        test('Should return true on success', async () => {
            const sut = makeSut();
            let post = await postCollection.insertOne({
                user
            });
            const result = await sut.likePost({
                post: post.insertedId.toString(),
                user: user
            });
            expect(result).toBe(true);
        });
    });

    describe('unlikePost', () => {
        let user: string;

        beforeEach(() => {
            user = new Types.ObjectId().toString();
        });
        test('Should return true on success', async () => {
            const sut = makeSut();
            let post = await postCollection.insertOne({
                user
            });
            const result = await sut.unlikePost({
                post: post.insertedId.toString(),
                user: user
            });
            expect(result).toBe(true);
        });
    });
});
