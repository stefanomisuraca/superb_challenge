import express from 'express';
import dbConnect from './db.js';

export const app = express()

app.get('/', function (req, res) {
  res.send('Home')
});

app.listen(8080);

dbConnect();