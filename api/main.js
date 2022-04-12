import express from 'express';
import restaurantsRouter from './restaurants/restaurants.js';
import shiftsRouter from './shifts/shifts.js';
import tablesRouter from './tables/tables.js';
import reservationsRouter from './reservations/reservations.js';
import dbConnect from './db.js';

const app = express()

app.get('/', async function (req, res) {
  res.send("Superb!");
});

app.use(express.urlencoded());
app.use(express.json());
app.use("/restaurants", restaurantsRouter);
app.use("/shifts", shiftsRouter);
app.use("/tables", tablesRouter);
app.use("/reservations", reservationsRouter);

if(process.env.JEST_WORKER_ID == undefined) {
  app.listen(8080);
}

dbConnect();

export default app;