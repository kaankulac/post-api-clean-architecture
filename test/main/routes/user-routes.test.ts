import { MongoHelper } from '@infrastructure/repositories';
import { setupApp } from '@main/config/app';

import { Collection } from 'mongodb';
import { hash } from 'bcrypt';
import { Express } from 'express';
import request from 'supertest';
import env from '@main/config/env';

import { sign } from 'jsonwebtoken';

let userCollection: Collection;
let app: Express;

const mockAccessToken = async (): Promise<string> => {
    const res = await userCollection.insertOne({
        username: 'username',
        password: '123123123'
    });
    const id = res.insertedId.toString();
    const accessToken = sign({ id }, env.jwtSecret);
    await userCollection.updateOne(
        {
            _id: res.insertedId
        },
        {
            $set: {
                accessToken
            }
        }
    );
    return accessToken;
};

describe('User Routes', () => {
    beforeAll(async () => {
        app = await setupApp();
        await MongoHelper.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        userCollection = MongoHelper.getCollection('users');
        await userCollection.deleteMany({});
    });

    describe('POST /signup', () => {
        test('Should return 200 on signup', async () => {
            await request(app)
                .post('/api/signup')
                .send({
                    username: 'username',
                    password: '123123123',
                    passwordConfirmation: '123123123'
                })
                .expect(200);
            await request(app)
                .post('/api/signup')
                .send({
                    username: 'username',
                    password: '123123123',
                    passwordConfirmation: '123123123'
                })
                .expect(403);
        });
    });

    describe('POST /login', () => {
        test('Should return 200 on login', async () => {
            const password = await hash('123123123', 12);
            await userCollection.insertOne({
                username: 'username',
                password
            });
            await request(app)
                .post('/api/login')
                .send({
                    username: 'username',
                    password: '123123123'
                })
                .expect(200);
        });

        test('Should return 401 on failure', async () => {
            await request(app)
                .post('/api/login')
                .send({
                    username: 'username',
                    password: '123123123'
                })
                .expect(401);
        });
    });
});
