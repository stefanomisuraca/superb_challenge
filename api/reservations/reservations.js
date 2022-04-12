import express from 'express'
import Reservation from './reservationsSchema.js';

var reservationsRouter = express.Router();

reservationsRouter.get("/:id", async (req, res) => {
    try {
        res.json(await Reservation.findById(req.params.id));
    } catch(e) {
        res.status(400);
        res.json(e);
    }
});

reservationsRouter.get("/", async (req, res) => {
    try {
        res.json(await Reservation.find({}));
    } catch(e) {
        res.status(400);
        res.json(e);
    }
});

reservationsRouter.get("/shifts/:id", async (req, res) => {
    try {
        const reservations = await Reservation.find({shift: req.params.id})
            .populate({ 
                path: 'shift',
                populate: {
                    path: 'restaurant',
                    model: 'Restaurant'
                }
            })
            .populate({ 
                path: 'table',
                populate: {
                    path: 'restaurant',
                    model: 'Restaurant'
                } 
        });
        res.json(reservations);
    } catch(e) {
        res.status(400)
        res.json(e)
    }
});

reservationsRouter.post("/", async (req, res) => {
    let body = req.body;
    try {
        const newReservation = await Reservation.create(body);
        res.json(newReservation);
    } catch(e) {
        res.status(400);
        res.json(e);
    }
});

reservationsRouter.patch("/:id", async (req, res) => {
    var reservation = await Reservation.findById(req.params.id);
    console.log(reservation);
    
    for(const [k, v] of Object.entries(req.body)) reservation[k] = v;
    
    reservation.save().then((updatedReservation) => {
        res.json(updatedReservation);
    }).catch(e => {
        res.status(400);
        res.json(e);
    });
});

export default reservationsRouter;