import express from 'express';
import { dbConnect } from './db.js';
import restaurantRouter from './restaurants.js';
export const app = express()

app.get('/', async function (req, res) {
  res.send("home");
});

app.use(express.urlencoded());
app.use(express.json());
app.use("/restaurants", restaurantRouter);

app.listen(8080);

dbConnect();