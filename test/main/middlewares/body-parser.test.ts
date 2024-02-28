import { setupApp } from '@main/config/app';
import { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('Body Parser Middleware', () => {
    beforeAll(async () => {
        app = await setupApp();
    });

    test('Should parse body as a json', async () => {
        app.post('/body-parser-test', (req, res) => {
            res.send(req.body);
        });

        await request(app).post('/body-parser-test').send({ data: 'Test Data' }).expect({ data: 'Test Data' });
    });
});
