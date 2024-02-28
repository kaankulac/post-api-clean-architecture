import { setupApp } from '@main/config/app';

import { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('ContentType Middleware', () => {
    beforeAll(async () => {
        app = await setupApp();
    });

    test('Should return default content type as a json', async () => {
        app.get('/content_type_test', (req, res) => {
            res.send('');
        });

        await request(app).get('/content_type_test').expect('content-type', /json/);
    });

    test('Should return xml content type when forced', async () => {
        app.get('/content_type_test_xml', (req, res) => {
            res.type('xml');
            res.send('');
        });

        await request(app).get('/content_type_test_xml').expect('content-type', /xml/);
    });
});
