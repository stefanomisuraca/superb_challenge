import express from 'express'
import Table from './tableSchema.js';
import moment from 'moment';

var tablesRouter = express.Router();

tablesRouter.post("/", async (req, res) => {
   let body = req.body;
   try {
       const newTable = await Table.create(body);
       res.status(201);
       res.json(newTable);
   } catch(e) {
       res.status(400);
       res.json(e);
   }
});

tablesRouter.get("/restaurants/:id", async (req, res) => {
    try{
        let tables = await Table.find({restaurant: req.params.id}).populate("restaurant");
        res.json(tables);
    } catch(e) {
        res.status(500);
        res.json(e);
    }
});

tablesRouter.get("/", async (req, res) => {
    try{
        let tables = await Table.find({}).populate("restaurant");
        res.json(tables);
    } catch(e) {
        res.status(500);
        res.json(e);
    }
});

tablesRouter.get("/:id", async (req, res) => {
    try{
        let tables = await Table.findById(req.params.id).populate("restaurant");
        if(!tables) {
            res.status(404);
            res.json();
        } else {
            res.json(tables);
        }
    } catch(e) {
        res.status(404);
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
        res.status(204);
        res.json(table);
    } catch(e) {
        res.status(400);
        res.json(e.message);
    }
});

export default tablesRouter;