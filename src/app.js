const express = require('express');
const router = require('./router');
const cors = require('cors');
const app = express();
const pool = require('./models/elephantsql');

app.use(express.json());
app.use(cors({origin: '*'}));
app.use(router);

module.exports = app;

