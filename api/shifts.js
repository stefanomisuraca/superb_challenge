import express from 'express'
import { Shift } from './db.js';
import moment from 'moment';

var shiftsRouter = express.Router();

shiftsRouter.post("/", async (req, res) => {
   let body = req.body;
   body.start = moment(body.start, "YYYY-MM-DD hh:mm");
   body.end = moment(body.end, "YYYY-MM-DD hh:mm");
   try {
       const newShift = await Shift.create(body);
       res.json(newShift);
   } catch(e) {
       res.status(400);
       res.json(e);
   }
});

shiftsRouter.get("/:id", async (req, res) => {
    try {
        const shift = await Shift.findById(req.params.id);
        res.json(shift);
    } catch(e) {
        res.status(404)
        res.json(e)
    }
});

shiftsRouter.get("/restaurants/:id", async (req, res) => {
    try {
        let shifts = await Shift.find({restaurantId: req.params.id}).populate("restaurant");
        res.json(shifts);
    } catch(e) {
        res.status(500);
        res.json(e);
    }
});

export default shiftsRouter;