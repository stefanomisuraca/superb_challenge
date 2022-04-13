import request from 'supertest';
import app from '../main.js';


describe('Test Reservations endpoints', function () {

    let outOfShift = {
        "shift": "62568f68a397656fe6bd8cbb",
        "table": "62568f9ba397656fe6bd8ccb",
        "customers": 6,
        "reservedFrom": "2022-05-12 16:30",
        "reservedTo": "2022-05-12 17:30"
    }
    let tooManySeats = {
        "shift": "62568f68a397656fe6bd8cbb",
        "table": "62568f9ba397656fe6bd8ccb",
        "customers": 56,
        "reservedFrom": "2022-05-12 11:30",
        "reservedTo": "2022-05-12 12:30"
    }

    let alreadyReserved = {
        "shift": "62568f4da397656fe6bd8cb3",
        "table": "62568f7ea397656fe6bd8cbf",
        "customers": 2,
        "reservedFrom": "2022-05-12 11:30",
        "reservedTo": "2022-05-12 12:30"
    }

    test('Get reservation by id', async () => {
        const res = await request(app).get('/reservations/62569d1284c425ea0d21921d');
        expect(res.body._id).toEqual("62569d1284c425ea0d21921d");
    });

    test('Get all reservations for a specific shift', async () => {
        const res = await request(app).get('/reservations/shifts/62568f4da397656fe6bd8cb3');
        const body = res.body;
        for(let i=0; i<body.length; i++) {
            expect(body[i].shift._id).toEqual("62568f4da397656fe6bd8cb3");
        }
    });

    test('Post reservation out of shift', async () => {
        const res = await request(app).post('/reservations').send(outOfShift);
        expect(res.body).toStrictEqual(["reserved time must be within shift range"]);
       
    });

    test('Post reservation too many seats', async () => {
        const res = await request(app).post('/reservations').send(tooManySeats);
        expect(res.body).toStrictEqual(["Too many customers for this table"]); 
    });

    test('Post reservation is already reserved', async () => {
        const res = await request(app).post('/reservations').send(alreadyReserved);
        expect(res.body).toStrictEqual(["This table is already reserved"]); 
    });

});

