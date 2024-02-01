import { PostMongoRepository, MongoHelper } from '@infrastructure/repositories';
import { mockCreatePostParams, mockEditPostParams } from '@test/domain/mocks';
import env from '@main/config/env';

import { Collection } from 'mongoose';
import { faker } from '@faker-js/faker';

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
            const result = await sut.delete(faker.string.uuid());
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
            const result = await sut.edit({ ...mockEditPostParams(), id: faker.string.uuid() });
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
            const result = await sut.loadById(faker.string.uuid());
            expect(result).toBeNull();
        });
    });

    describe('loadByUser', () => {
        let author: string = faker.string.uuid();

        beforeEach(() => {
            author = faker.string.uuid();
        });
        test('Should return posts on success', async () => {
            const sut = makeSut();
            await postCollection.insertMany([
                { ...mockCreatePostParams(), author },
                { ...mockCreatePostParams(), author },
                { ...mockCreatePostParams(), author }
            ]);
            const result = await sut.loadByUser(author);
            expect(result).toHaveLength(3);
        });

        test('Should return [] when no posts found', async () => {
            const sut = makeSut();
            const result = await sut.loadByUser(author);
            expect(result).toBe([]);
        });
    });

    describe('likePost', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const result = await sut.likePost({ post: faker.string.uuid(), user: faker.string.uuid() });
            expect(result).toBe(true);
        });
    });

    describe('unlikePost', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const result = await sut.unlikePost({ post: faker.string.uuid(), user: faker.string.uuid() });
            expect(result).toBe(true);
        });
    });
});
