import express from 'express'
import Restaurant from './restaurantsSchema.js';

var restaurantsRouter = express.Router();

restaurantsRouter.get("/", async (req, res) => {
    res.json(await Restaurant.find({}));
});

restaurantsRouter.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.json(restaurant);
    } catch (e) {
        res.status(404);
        res.json();
    }

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