import request from 'supertest';
import app from '../main.js';

const expectedResult = {
    "_id": "62568f02a397656fe6bd8caa",
    "name": "SuperbRestaurant",
    "owner": "Superb",
    "__v": 0
  }


describe('Test Restaurant endpoints', function () {

    test('Get restaurant by id', async () => {
        const res = await request(app).get('/restaurants/62568f02a397656fe6bd8caa');
        expect(res.body).toEqual(expectedResult);
    });
});

