import express from 'express'
import { Shift } from './db.js';
import moment from 'moment';

var shiftsRouter = express.Router();

shiftsRouter.post("/", async (req, res) => {
   let body = req.body;
   body.start = moment(body.start, "YYYY-MM-DD hh:mm");
   body.end = moment(body.end, "YYYY-MM-DD hh:mm");
   console.log(body);
   const newShift = await Shift.create(body);
   res.json(newShift);
});

shiftsRouter.get("/restaurants/:id", async (req, res) => {
    let shifts = await Shift.find({restaurantId: req.params.id}).populate("restaurant");
    res.json(shifts);
});

export default shiftsRouter;