import { setupApp } from '@main/config/app';
import { noCache } from '@main/middlewares';

import { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('NoCache Middleware', () => {
    beforeAll(async () => {
        app = await setupApp();
    });

    test('Should disable cache', async () => {
        app.get('/no_cache_test', noCache, (req, res) => {
            res.send('');
        });

        await request(app)
            .get('/no_cache_test')
            .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
            .expect('pragma', 'no-cache')
            .expect('expires', '0')
            .expect('surrogate-control', 'no-store');
    });
});
