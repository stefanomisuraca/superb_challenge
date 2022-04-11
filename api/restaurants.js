import express from 'express'
import { Restaurant } from './db.js';

var restaurantsRouter = express.Router();

restaurantsRouter.get("/", async (req, res) => {
    if(req.query.name) {
        const name = req.query.name;
        res.send(await Restaurant.find({name}));
    } else {
        res.send(await Restaurant.find({}));
    }
});

restaurantsRouter.post("/", async (req, res) => {
    let body = req.body;
    const newRestaurant = await Restaurant.create(body);
    res.json(newRestaurant);
});

export default restaurantsRouter;