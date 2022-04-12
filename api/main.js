import express from 'express';
import { dbConnect } from './db.js';
import restaurantsRouter from './restaurants/restaurants.js';
import shiftsRouter from './shifts/shifts.js';
import tablesRouter from './tables/tables.js';
import reservationsRouter from './reservations/reservations.js';
export const app = express()

app.get('/', async function (req, res) {
  res.send("home");
});

app.use(express.urlencoded());
app.use(express.json());
app.use("/restaurants", restaurantsRouter);
app.use("/shifts", shiftsRouter);
app.use("/tables", tablesRouter);
app.use("/reservations", reservationsRouter);
app.listen(8080);

dbConnect();