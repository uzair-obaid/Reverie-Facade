const express = require('express');
const app = express();
const connectDB = require('./config/db');

const authroute = require('./routes/auth');
const journalroute = require('./routes/journal');
const testroute = require('./routes/test');

connectDB();

app.use(express.json());

app.use('/api/auth', authroute);
app.use('/api/journal', journalroute);
app.use('/api/test', testroute);

module.exports = app;