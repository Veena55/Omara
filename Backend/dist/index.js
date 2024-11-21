import express from 'express';
const app = express();
import db from './db.js';
db();
app.use(express.json());
app.listen(3000, () => {
    console.log("Server Connection Built!!");
});
