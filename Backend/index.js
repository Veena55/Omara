const express = require('express');
const app = express();
const { db } = require('../Backend/db');

db();

app.listen(3000, () => {
    console.log("Server Connection Built!!");
});