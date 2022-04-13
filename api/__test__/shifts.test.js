import request from 'supertest';
import app from '../main.js';


describe('Test Shift endpoints', function () {
    let brokenPayload = {
        "restaurant": "62568f02a397656fe6bd8caa",
        "start": "2022-05-12 11:00",
        "end": "2022-05-12 16:00"
    }

    test('Test Overlapping shifts', async () => {
        const res = await request(app).post('/shifts').send(brokenPayload);
        expect(res.body.error.message).toEqual('these shifts are overlapping');
    });

    test('Get all shifts for restaurant', async () => {
        const res = await request(app).get('/shifts/restaurants/62568f02a397656fe6bd8caa');
        let body = res.body;
        for(let i=0; i<body.length; i++) {
            expect(body[i].restaurant._id).toEqual("62568f02a397656fe6bd8caa");
        }
    });

    test('Get a shift by id', async () => {
        const res = await request(app).get('/shifts/62568f4da397656fe6bd8cb3');
        expect(res.body._id).toEqual("62568f4da397656fe6bd8cb3");
    });

    test('Get all shifts', async () => {
        const res = await request(app).get('/shifts');
        expect(res.body.length).toEqual(3);
    });

});

