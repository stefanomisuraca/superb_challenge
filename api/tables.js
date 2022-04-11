import express from 'express'
import { Table } from './db.js';
import moment from 'moment';

var tablesRouter = express.Router();

tablesRouter.post("/", async (req, res) => {
   let body = req.body;
   body.start = moment(body.reservedFrom, "YYYY-MM-DD hh:mm");
   body.end = moment(body.reservedTo, "YYYY-MM-DD hh:mm");
   console.log(body);
   try {
       const newTable = await Table.create(body);
       res.json(newTable);
   } catch(e) {
       res.status(400);
       res.json(e);
   }
});

tablesRouter.get("/shifts/:id", async (req, res) => {
    try{
        let shifts = await Table.find({shift: req.params.id}).populate("shift");
        res.json(shifts);
    } catch(e) {
        res.status(500);
        res.json(e);
    }
});

tablesRouter.patch("/:id", async (req, res) => {
    try {
        const table = await Table.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json(table);
    } catch(e) {
        res.status(400);
        res.json(e);
    }
});

tablesRouter.delete("/:id", async (req, res) => {
    try {
        let table = await Table.deleteOne({_id: req.params.id});
        res.status(201);
        res.json(table);
    } catch(e) {
        res.status(400);
        res.json(e.message);
    }

});

export default tablesRouter;