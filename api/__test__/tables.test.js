import request from 'supertest';
import app from '../main.js';


describe('Test Tables endpoints', function () {
    let payload = {
        "seats": 10,
        "restaurant": "62568f14a397656fe6bd8cac"
    }
    let patchPayload = {
        "seats": 4,
    }

    test('Test post table', async () => {
        const res = await request(app).post('/tables').send(payload);
        const newId = res.body._id;
        console.log(newId);
        expect(res.status).toEqual(201);
        await request(app).delete(`/tables/${newId}`);

    });

    test('Test patch table by id', async () => {
        let res = await request(app).get('/tables/62568f9ea397656fe6bd8ccd');
        console.log(res.body);
        expect(res.body.seats).toEqual(10);
        res = await request(app).patch('/tables/62568f9ea397656fe6bd8ccd').send(patchPayload);
        expect(res.body.seats).toEqual(4);
        await request(app).patch('/tables/62568f9ea397656fe6bd8ccd').send({"seats": 10});
    });

    test('Test delete table by id', async () => {
        var res = await request(app).post('/tables').send(payload);
        const newId = res.body._id;
        res = await request(app).delete(`/tables/${newId}`);
        expect(res.status).toBe(204);
        res = await request(app).get(`/tables/${newId}`);
        console.log(res.body);
        expect(res.status).toBe(404);
    });

});

