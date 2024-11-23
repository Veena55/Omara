import express from 'express';
const app = express();
import db from './db.js';
import { router as orderRoute } from './routes/order.js';
import cors from 'cors';


db();


app.use(cors());
app.use(express.json());

// const router = app.use(Router());

app.use('/order', orderRoute);

app.listen(3000, () => {
    console.log("Server Connection Built!!");
});