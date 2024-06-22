const express = require('express');
const app = express();
const connectDB = require('./config/db');

const authroute = require('./routes/auth');

connectDB();

app.use(express.json());

app.use('/api/auth', authroute);

module.exports = app;