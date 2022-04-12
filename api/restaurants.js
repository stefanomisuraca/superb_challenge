import express from 'express'
import { Restaurant } from './schemas.js';

var restaurantsRouter = express.Router();

restaurantsRouter.get("/", async (req, res) => {
    res.json(await Restaurant.find({}));
});

restaurantsRouter.post("/", async (req, res) => {
    let body = req.body;
    try {
        const newRestaurant = await Restaurant.create(body);
        res.json(newRestaurant);
    } catch(e) {
        res.status(400);
        res.json(e);
    }
});

export default restaurantsRouter;