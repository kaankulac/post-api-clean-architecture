import { UserMongoRepository, MongoHelper } from '@infrastructure/repositories';
import { mockCreateUserParams } from '@test/domain/mocks';
import env from '@main/config/env';

import { Collection } from 'mongoose';
import { faker } from '@faker-js/faker';

const makeSut = (): UserMongoRepository => {
    return new UserMongoRepository();
};

let userCollection: Collection;

describe('UserMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        userCollection = MongoHelper.getCollection('users');
        await userCollection.deleteMany({});
    });

    describe('create', () => {
        test('Should return true on success', async () => {
            const sut = makeSut();
            const isValid = await sut.create(mockCreateUserParams());
            expect(isValid).toBe(true);
        });
    });

    describe('loadByUsername', () => {
        test('Should return a user on success', async () => {
            const sut = makeSut();
            const createUserParams = mockCreateUserParams();
            await userCollection.insertOne(createUserParams);
            const account = await sut.loadByUsername(createUserParams.username);
            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.username).toBe(createUserParams.username);
            expect(account.password).toBe(createUserParams.password);
        });

        test('Should return null if loadByUsername fails', async () => {
            const sut = makeSut();
            const account = await sut.loadByUsername(faker.internet.userName());
            expect(account).toBeNull();
        });
    });

    describe('checkByUsername', () => {
        test('Should return true if username is exists', async () => {
            const sut = makeSut();
            const createUserParams = mockCreateUserParams();
            await userCollection.insertOne(createUserParams);
            const exists = await sut.checkByUserName(createUserParams.username);
            expect(exists).toBe(true);
        });

        test('Should return false if username is not exists', async () => {
            const sut = makeSut();
            const exists = await sut.checkByUserName(faker.internet.userName());
            expect(exists).toBe(false);
        });
    });

    describe('updateAccessToken', () => {
        test('Should update the user access token on success', async () => {
            const sut = makeSut();
            const res = await userCollection.insertOne(mockCreateUserParams());
            const fakeUser = await userCollection.findOne({ _id: res.insertedId });
            expect(fakeUser.accessToken).toBeFalsy();
            const accessToken = faker.string.uuid();
            await sut.updateAccessToken({ id: fakeUser._id?.toString(), token: accessToken });
            const user = await userCollection.findOne({ _id: fakeUser._id });
            expect(user).toBeTruthy();
            expect(user.accessToken).toBe(accessToken);
        });
    });

    describe('loadByToken', () => {
        let username = faker.internet.userName();
        let password = faker.internet.password();
        let accessToken = faker.string.uuid();

        beforeEach(() => {
            username = faker.internet.userName();
            password = faker.internet.password();
            accessToken = faker.string.uuid();
        });

        test('Should return a user on success', async () => {
            const sut = makeSut();
            await userCollection.insertOne({
                username,
                password,
                accessToken
            });
            const user = await sut.loadByToken(accessToken);
            expect(user).toBeTruthy();
            expect(user.id).toBeTruthy();
        });

        test('Should return null if loadByToken fails', async () => {
            const sut = makeSut();
            const user = await sut.loadByToken(accessToken);
            expect(user).toBeNull();
        });
    });
});
