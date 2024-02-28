import { setupApp } from '@main/config/app';

import { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('CORS middleware', () => {
    beforeAll(async () => {
        app = await setupApp();
    });

    test('Should enable CORS', async () => {
        app.get('/cors_test', (req, res) => {
            res.send();
        });

        await request(app)
            .get('/cors_test')
            .expect('access-control-allow-origin', '*')
            .expect('access-control-allow-methods', '*')
            .expect('access-control-allow-headers', '*');
    });
});
