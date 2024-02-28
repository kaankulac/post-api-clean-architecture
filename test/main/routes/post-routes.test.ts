import env from '@main/config/env';
import { MongoHelper } from '@infrastructure/repositories';
import { setupApp } from '@main/config/app';

import { sign } from 'jsonwebtoken';
import { Collection } from 'mongoose';
import { Express } from 'express';
import request from 'supertest';

let postCollection: Collection;
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

describe('Post Routes', () => {
    beforeAll(async () => {
        app = await setupApp();
        await MongoHelper.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        postCollection = MongoHelper.getCollection('posts');
        await postCollection.deleteMany({});
        userCollection = MongoHelper.getCollection('users');
        await userCollection.deleteMany({});
    });

    describe('POST /post/create', () => {
        test('Should 201 on success', async () => {
            const accessToken = await mockAccessToken();
            await request(app).post('/api/post/create').set('x-access-token', accessToken).send({
                title: 'post test',
                description: 'post test description'
            });
        });

        test('Should return 400 on invalid body with authenticated user', async () => {
            const accessToken = await mockAccessToken();
            await request(app).post('/api/post/create').set('x-access-token', accessToken).send({});
        });

        test('Should return 401 when user is not authenticated', async () => {
            await request(app)
                .post('/api/post/create')
                .send({
                    title: 'post test',
                    description: 'post test description'
                })
                .expect(401);
        });
    });

    describe('GET /posts', () => {
        test('Should return 200 with results on success', async () => {
            const accessToken = await mockAccessToken();
            await postCollection.insertOne({
                title: 'title post',
                description: 'description post'
            });
            await request(app)
                .get('/api/posts')
                .query({ page: '0', per: '3' })
                .set('x-access-token', accessToken)
                .expect(200);
        });

        test('Should return 400 when no page or per query sended', async () => {
            const accessToken = await mockAccessToken();
            await postCollection.insertOne({
                title: 'title post',
                description: 'description post'
            });
            await request(app).get('/api/posts').set('x-access-token', accessToken).expect(400);
        });

        test('Should return 401 when user is not authenticated', async () => {
            await request(app).get('/api/posts').expect(401);
        });
    });
});
