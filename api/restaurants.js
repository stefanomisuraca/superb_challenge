import express from 'express'
import { Restaurant } from './db.js';

var restaurantRouter = express.Router();

restaurantRouter.get("/", async (req, res) => {
    if(req.query.name) {
        const name = req.query.name;
        res.send(await Restaurant.find({name}));
    } else {

    }
    res.send(await Restaurant.find({}));
});

restaurantRouter.post("/", async (req, res) => {
    const body = req.body;
    const newRestaurant = await Restaurant.create(req.body);
    res.json(newRestaurant);
});

export default restaurantRouter;