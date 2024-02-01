import { LogMongoRepository, MongoHelper } from '@infrastructure/repositories';
import env from '@main/config/env';

import { Collection } from 'mongoose';
import { faker } from '@faker-js/faker';

const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository();
};

let errorCollection: Collection;

describe('LogMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        errorCollection = MongoHelper.getCollection('logs');
        await errorCollection.deleteMany({});
    });

    test('Should create an error log on success', async () => {
        const sut = makeSut();
        await sut.logError(faker.lorem.words());
        const count = await errorCollection.countDocuments();
        expect(count).toBe(1);
    });
});
