import request from 'supertest';
import app from '../main.js';

describe('Test Restaurant endpoints', function () {

    test('Get all restaurants at /', async () => {
        const res = await request(app).get('/restaurants');
        console.log(res.body);
        expect(res.body).toEqual(undefined);
    });
});