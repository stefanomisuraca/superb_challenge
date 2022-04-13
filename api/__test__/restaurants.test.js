import request from 'supertest';
import app from '../main.js';

const expectedResult = [
    {
        _id: '62568f02a397656fe6bd8caa',
        name: 'SuperbRestaurant',
        owner: 'Superb',
        __v: 0
    },
    {
        _id: '62568f14a397656fe6bd8cac',
        name: 'StefanoRestaurant',
        owner: 'Stefano',
        __v: 0
    }
]


describe('Test Restaurant endpoints', function () {

    test('Get all restaurants at /', async () => {
        const res = await request(app).get('/restaurants');
        console.log(res.body);
        expect(res.body.length).toEqual(2);
        expect(res.body).toEqual(expectedResult);
    });
});

